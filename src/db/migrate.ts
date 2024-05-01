import { exit } from 'process';
import 'module-alias/register';
import dotenv from "dotenv"
import { Umzug } from 'umzug';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

// GET DB CONF
dotenv.config({path: `.env.${process.env.NODE_ENV}`})

let sqConf: SequelizeOptions = {
  dialect: "postgres"
};

  sqConf = {
    ...sqConf,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(`${process.env.DATABASE_PORT}`),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
  };

// MAIN OBJECT
const sequelize = new Sequelize(sqConf);

const umzug = new Umzug({
  migrations: { glob: ['migrations/*.ts', { cwd: __dirname }] },
  context: sequelize,
  logger: console,
});

// export the type helper exposed by umzug, which will have the `context` argument typed correctly
export type Migration = typeof umzug._types.migration;

umzug.runAsCLI().then(() => {exit()});