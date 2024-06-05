import winston from "winston";

export class Logger {
  private static logger: winston.Logger;

  static setup(): void {
    const options: winston.LoggerOptions = {
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === "production" ? "error" : "debug",
        }),
        new winston.transports.File({ filename: "debug.log", level: "debug" }),
      ],
    };

    Logger.logger = winston.createLogger(options);

    if (process.env.NODE_ENV !== "production") {
      Logger.logger.debug("Logging initialized at debug level");
    }

    process.on("unhandledRejection", (ex) => {
      throw ex;
    });

    process.on("uncaughtException", (ex) => {
      Logger.logger.error(ex.message, ex);
      process.exit(1);
    });

    // Bind logger methods back to Logger class
    Logger.info = Logger.logger.info.bind(Logger.logger);
    Logger.debug = Logger.logger.debug.bind(Logger.logger);
    Logger.error = Logger.logger.error.bind(Logger.logger);
    Logger.warn = Logger.logger.warn.bind(Logger.logger);
  }

  static info: winston.LeveledLogMethod;
  static debug: winston.LeveledLogMethod;
  static error: winston.LeveledLogMethod;
  static warn: winston.LeveledLogMethod;
}
