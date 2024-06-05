import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../../models/User";
import { Task } from "../../models/Task";
import { Logger } from "../logger/logger";
import config from "config";
import { TaskAttachment } from "../../models/TaskAttachment";
import { TaskComment } from "../../models/TaskComment";
import { TeamMembership } from "../../models/TeamMembership";
import { Team } from "../../models/Team";

export class Database {
  public static dataSource: DataSource;

  private constructor() {} // Private constructor to prevent instantiation

  static async connect(): Promise<boolean> {
    if (this.dataSource) {
      Logger.warn("Database connection already established");
      return true;
    }

    const env = config.get("server.NODE_ENV");
    const dbConfig = config.get<any>("database");

    const options: DataSourceOptions = {
      type: "postgres",
      host: dbConfig.host || "localhost",
      port: dbConfig.port || 5432,
      username: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      synchronize: env === "development" ? true : false, // Set to true in development, false in production
      logging: true, // Set to true for debugging
      entities: [User, Task, TaskAttachment, TaskComment, TeamMembership, Team], // Import your entity classes here
      migrations: ["src/migrations/*{.ts,.js}"], // where our migrations reside
    };

    try {
      this.dataSource = new DataSource(options);
      await this.dataSource.initialize();
      Logger.info("Connected to PostgreSQL database");
      return true; // Connection successful
    } catch (err) {
      Logger.error("Error connecting to PostgreSQL:", err);
      return false; // Connection failed
    }
  }

  static async disconnect(): Promise<void> {
    if (this.dataSource) {
      await this.dataSource.destroy();
      Logger.info("Disconnected from PostgreSQL database");
      this.dataSource = null as any;
    } else {
      Logger.warn("Database connection is not established");
    }
  }

  static async query(text: string, params: any[]): Promise<any> {
    try {
      if (!this.dataSource) {
        throw new Error("Database connection not established");
      }
      return await this.dataSource.query(text, params);
    } catch (err) {
      Logger.error("Error executing query:", err);
      throw err;
    }
  }
}
