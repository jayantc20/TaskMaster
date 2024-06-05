import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { authenticateUser } from "../middleware/authMiddleware";
import {
  createTaskValidator,
  updateTaskValidator,
} from "../middleware/taskValidatorMiddleware";

const taskRouter = (taskController: TaskController): Router => {
  const router = Router();

  router.post(
    "/",
    authenticateUser,
    createTaskValidator,
    taskController.createTask.bind(taskController)
  );
  router.get(
    "/",
    authenticateUser,
    taskController.getAllTasks.bind(taskController)
  );
  router.get(
    "/:id",
    authenticateUser,
    taskController.getTaskById.bind(taskController)
  );
  router.put(
    "/:id",
    authenticateUser,
    updateTaskValidator,
    taskController.updateTaskById.bind(taskController)
  );
  router.delete(
    "/:id",
    authenticateUser,
    taskController.deleteTaskById.bind(taskController)
  );
  router.put(
    "/:id/status",
    authenticateUser,
    taskController.changeTaskStatus.bind(taskController)
  );
  router.put(
    "/:id/assign",
    authenticateUser,
    taskController.assignTask.bind(taskController)
  );
  router.get(
    "/filter/:status",
    authenticateUser,
    taskController.filterTasksByStatus.bind(taskController)
  );
  router.get(
    "/search",
    authenticateUser,
    taskController.searchTasks.bind(taskController)
  );
  router.post(
    "/:id/comment",
    authenticateUser,
    taskController.addCommentToTask.bind(taskController)
  );
  router.post(
    "/:id/attachment",
    authenticateUser,
    taskController.addAttachmentToTask.bind(taskController)
  );

  return router;
};

export default taskRouter;
