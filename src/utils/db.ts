/* eslint-disable no-prototype-builtins */
import 'module-alias/register';
import dotenv from "dotenv"

import { ModelCtor, Sequelize, SequelizeOptions } from "sequelize-typescript";
import { SyncOptions } from "sequelize/types";
import { Config } from "../config";
import { Logger } from "./logger";
import { URL } from "@cliqz/url-parser";

// GET DB CONF
dotenv.config({path: `.env.${process.env.APP_ENV}`})

const CURRENT_LAMBDA_FUNCTION_TIMEOUT = 120000; //TODO: set a reasonable timeout for lambdas
let sqConf: SequelizeOptions = {
  dialect: "postgres",
  logging: Config.dbLog,
  pool: { //see https://sequelize.org/docs/v6/other-topics/aws-lambda/ for pool config details
    max: 2, //max connections per container
    min: 0, //min connections per container
    idle: 0, //setting this to 0 makes connections eligible for cleanup immediately after they're returned to the pool.
    acquire: 3000, // Choose a small enough value that fails fast if a connection takes too long to be established.
    /*
     * Ensures the connection pool attempts to be cleaned up automatically on the next Lambda
     * function invocation, if the previous invocation timed out.
     */
    evict: CURRENT_LAMBDA_FUNCTION_TIMEOUT
  }
};

if (Config.DB?.url) {
  const dbUrl = new URL(Config.DB.url);
  sqConf = {
    ...sqConf,
    database: dbUrl.pathname.replace("/", ""),
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port),
    username: dbUrl.username,
    password: dbUrl.password,
  };
} else {
  sqConf = {
    ...sqConf,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(`${process.env.DATABASE_PORT}`),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
  };
}

// MAIN OBJECT
let sequelize: Sequelize | null = null;

async function loadSequelize() {
  if (!sequelize) {
    sequelize = new Sequelize(sqConf);
  } else {
    // restart connection pool to ensure connections are not re-used across invocations
    sequelize.connectionManager.initPools();
    
    // restore `getConnection()` if it has been overwritten by `close()`
    if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
      delete sequelize.connectionManager.getConnection;  
    }
  }
}

 //DEFINITIONS
const sync = async (options?: SyncOptions) => {
  try {
    if(sequelize!=null){
      await sequelize.sync(options);
      Logger.debug("Sync done");
    }else{
      throw new Error('DB not initilized')
    }
  } catch (err) {
    Logger.error("Error syncing sequelize", err);
  }
};
const closeWithManager = async() => {if(sequelize) await sequelize.connectionManager.close();}
const closeConnection = async() => {if(sequelize) await sequelize.close()};
const syncForce = async () => await sync({ force: true });
const syncAlter = async () => await sync({ alter: true });

// AUTHENTICATE
const initialize = async() => {
    try {
      loadSequelize();
      if(sequelize!=null)
        await sequelize.authenticate();
      else
        throw new Error('DB not initilized')
  } catch (err: unknown) {
      Logger.error('An error occurred:', err);
      throw new Error(JSON.stringify(err));
  }
}

export const DB = {
  isLoaded: false,
  sync: sync,
  syncForce: syncForce,
  syncAlter: syncAlter,
  closeConnection: closeConnection,
  closeWithManager: closeWithManager,
  useModels: (models: ModelCtor[]) => {
    if(sequelize!=null){
      sequelize.addModels(models);
    }else
      throw new Error('DB not initialized')
  },
  models: () => {if(sequelize)return sequelize.models},
  _truncateAll: () => {
    if(sequelize)
      Object.values(sequelize.models).map(
        async (model) => await model.destroy({ truncate: true })
      );
    else
      throw new Error('DB not initialized')
  },
  authenticate() { 
    try {
      initialize().then(()=>{
          Logger.debug("DB loaded");
          DB.isLoaded = true;
      });
    } catch (err: unknown) {
      Logger.error("Error during DB load", err);
      throw new Error(JSON.stringify(err));
    }
  }
};
