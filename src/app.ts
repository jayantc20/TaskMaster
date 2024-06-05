import express from "express";
import config from "config";
import { Logger } from "./utils/logger/logger";
import { Database } from "./utils/database/database";
import { setupConfig } from "./setupConfig";
import { setupServices } from "./setupServices";
import createRouter from "./routes"; // Import the function
import { errorHandler } from "./middleware/errorHandlerMiddleware";
import "reflect-metadata";

const serverPort = config.get("server.port");

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    setupConfig(this.app);
    this.databaseSetup().then(() => {
      this.initializeServices();
      this.app.use(errorHandler);
      this.startServer();
    });
    this.handleShutdown();
  }

  private async databaseSetup(): Promise<void> {
    const isConnected = await Database.connect();
    if (!isConnected) {
      Logger.error("Cannot start server: Database is not connected.");
      process.exit(1); // Exit the process if the database connection fails
    }
  }

  private initializeServices(): void {
    if (Database.dataSource) {
      const { taskController, userController, teamController } = setupServices(
        Database.dataSource
      );
      this.app.use("/api/v1", createRouter(taskController, userController, teamController));
    }
  }

  private startServer(): void {
    const port = serverPort || 3000;
    this.app.listen(port, () => {
      Logger.info(`Server is running on port ${port}`);
    });
  }

  private handleShutdown(): void {
    process.on("SIGINT", async () => {
      Logger.info("Received SIGINT, shutting down gracefully...");
      await Database.disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      Logger.info("Received SIGTERM, shutting down gracefully...");
      await Database.disconnect();
      process.exit(0);
    });
  }
}

export default new App().app;
