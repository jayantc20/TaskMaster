import { DataSource } from "typeorm";
import { TaskRepository } from "./repositories/TaskRepository";
import { TaskService } from "./services/TaskService";
import { TaskController } from "./controllers/TaskController";
import { UserRepository } from "./repositories/UserRepository";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { TeamRepository } from "./repositories/TeamRepository";
import { TeamService } from "./services/TeamService";
import { TeamController } from "./controllers/TeamController";

export const setupServices = (dataSource: DataSource) => {
  const taskRepository = new TaskRepository(dataSource);
  const taskService = new TaskService(taskRepository);
  const taskController = new TaskController(taskService);

  const userRepository = new UserRepository(dataSource);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  const teamRepository = new TeamRepository(dataSource);
  const teamService = new TeamService(teamRepository);
  const teamController = new TeamController(teamService);

  return {
    taskController,
    userController,
    teamController,
  };
};
