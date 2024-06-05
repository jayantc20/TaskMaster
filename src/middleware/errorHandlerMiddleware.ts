import { Request, Response, NextFunction } from "express";
import config from "config";
import { Logger } from "../utils/logger/logger";
import { AuthenticationError, NotFoundError } from "../utils/errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  Logger.error(err.stack);

  const isProduction = config.get("server.NODE_ENV") === "production";

  if (err instanceof AuthenticationError) {
    res.status(401).json({
      message: err.message,
      ...(isProduction ? {} : { stack: err.stack }), // Include stack trace in development
    });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({
      message: err.message,
      ...(isProduction ? {} : { stack: err.stack }), // Include stack trace in development
    });
  } else if (isProduction) {
    res.status(500).json({ error: "Internal Server Error" });
  } else {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
};
