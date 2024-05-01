import 'module-alias/register';
import { Config } from "@config";

export enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG,
    TRACE
}
  
export type LogLevels = keyof typeof LogLevel;

export class Logger {
  static trace(message: string, data?: unknown) {
    if (Config.logLevel < LogLevel.TRACE) return;
    console.trace(`TRACE: ${message}`, data ? Logger.jsonStringify(data) : "");
  }

  static debug(message: string, data?: unknown) {
    if (Config.logLevel < LogLevel.DEBUG) return;
    console.log(`DEBUG: ${message}`, data ? Logger.jsonStringify(data) : "");
  }

  static info(message: string, data?: unknown) {
    if (Config.logLevel < LogLevel.INFO) return;
    console.info(`INFO: ${message}`, data ? Logger.jsonStringify(data) : "");
  }

  static warn(message: string, data?: unknown) {
    if (Config.logLevel < LogLevel.WARN) return;
    console.warn(`WARN: ${message}`, data ? Logger.jsonStringify(data) : "");
  }

  static error(message: string, data?: unknown) {
    console.error(`ERROR: ${message}`, data ? Logger.jsonStringify(data) : "");
  }

  static jsonStringify(data: unknown): string {
    return JSON.stringify(data, null, 2);
  }
}