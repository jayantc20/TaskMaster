import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/TaskService";
import { Task, TaskStatus } from "../models/Task";
import { User } from "../models/User";

export class TaskController {
  constructor(private taskService: TaskService) {}

  public async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskData: Partial<Task> = req.body;
      const user: User | undefined = req.user;
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const newTask = await this.taskService.createTask(taskData, user);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }

  public async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: number | undefined = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const tasks = await this.taskService.findTasksByUserId(userId);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  public async changeTaskStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId: number = parseInt(req.params.id, 10);
      const { status }: { status: TaskStatus } = req.body;
      const success = await this.taskService.changeTaskStatus(taskId, status);
      if (success) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: `Task with ID ${taskId} not found` });
      }
    } catch (error) {
      next(error);
    }
  }

  public async getTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId: number = parseInt(req.params.id, 10);
      const task = await this.taskService.getTaskById(taskId);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: `Task with ID ${taskId} not found` });
      }
    } catch (error) {
      next(error);
    }
  }

  public async updateTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId: number = parseInt(req.params.id, 10);
      const updatedTaskData: Partial<Task> = req.body;
      const updatedTask = await this.taskService.updateTaskById(
        taskId,
        updatedTaskData
      );
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ message: `Task with ID ${taskId} not found` });
      }
    } catch (error) {
      next(error);
    }
  }

  public async deleteTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId: number = parseInt(req.params.id, 10);
      const success = await this.taskService.deleteTaskById(taskId);
      if (success) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: `Task with ID ${taskId} not found` });
      }
    } catch (error) {
      next(error);
    }
  }

  public async filterTasksByStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: number | undefined = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const status: TaskStatus = req.query.status as TaskStatus;
      const tasks = await this.taskService.filterTasksByStatus(status, userId);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  public async searchTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: number | undefined = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const searchTerm: string = req.query.searchTerm as string;
      const tasks = await this.taskService.searchTasksByTitleOrDescription(
        searchTerm,
        userId
      );
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  public async addCommentToTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId: number = parseInt(req.params.id, 10);
      const comment: string = req.body.comment;
      const userId: number | undefined = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const updatedTask = await this.taskService.addCommentToTask(
        taskId,
        comment,
        userId
      );
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ message: `Task with ID ${taskId} not found` });
      }
    } catch (error) {
      next(error);
    }
  }

  public async addAttachmentToTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId: number = parseInt(req.params.id, 10);
      const attachmentUrls: string[] = req.body.attachmentUrls;
      const userId: number | undefined = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const updatedTask = await this.taskService.addAttachmentToTask(
        taskId,
        attachmentUrls,
        userId
      );
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ message: `Task with ID ${taskId} not found` });
      }
    } catch (error) {
      next(error);
    }
  }

  public async assignTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId: number = parseInt(req.params.id, 10);
      const user: User | undefined = req.user;
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const assignedTask = await this.taskService.assignTask(taskId, user);
      res.json(assignedTask);
    } catch (error) {
      next(error);
    }
  }
}
