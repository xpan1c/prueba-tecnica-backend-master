import 'module-alias/register';
import * as dotenv from "dotenv";
import { LogLevel, Logger } from "./utils/logger";

//dotenv.config({ path: ".env" });
let env: string = (process.env.NODE_ENV as string) || "dev";
env = env.toLowerCase();
if(env == "dev") dotenv.config({ path: ".env.dev" });
else if(env == 'test') dotenv.config({ path: ".env.test"});
else dotenv.config({ path: ".env.prod" });

//console.log(`Environment mode is ${env}`);
export const Config = {
  ENV: env,
  PORT: parseInt(process.env.PORT as string, 10) || 3000,
  DB: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  dbLog: process.env.DBLOG == "true" ? Logger.debug : false,
  logLevel:
    LogLevel[process.env.LOG_LEVEL as keyof typeof LogLevel] || LogLevel.DEBUG,
  AWS: {
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
  },
  load: () => {
    /*dummy code for TS to load this script (sight)*/
  }, 
};