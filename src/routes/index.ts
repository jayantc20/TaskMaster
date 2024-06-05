import { Router } from "express";
import authRoutes from "./authRoutes";
import taskRouter from "./taskRoutes";
import teamRouter from "./teamRoutes";
import { TaskController } from "../controllers/TaskController";
import { UserController } from "../controllers/UserController";
import { TeamController } from "../controllers/TeamController";

const createRouter = (
  taskController: TaskController,
  userController: UserController,
  teamController: TeamController
): Router => {
  const router = Router();

  router.use("/users", authRoutes(userController));
  router.use("/tasks", taskRouter(taskController));
  router.use("/teams", teamRouter(teamController));

  return router;
};

export default createRouter;
