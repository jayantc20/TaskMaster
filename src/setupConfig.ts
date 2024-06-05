import express, { json, urlencoded } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { Logger } from "./utils/logger/logger";

export const setupConfig = (app: express.Application): void => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(limiter);
  app.use(helmet());

  Logger.setup();
};
