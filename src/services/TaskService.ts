import { TaskRepository } from "../repositories/TaskRepository";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { TaskStatus } from "../models/Task";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async findTasksByUserId(userId: number): Promise<Task[]> {
    try {
      return await this.taskRepository.findTasksByUserId(userId);
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }

  async getTaskById(userId: number): Promise<Task | null> {
    try {
      return await this.taskRepository.getTaskById(userId);
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }

  async updateTaskById(
    userId: number,
    updatedTaskData: Partial<Task>
  ): Promise<Task | undefined> {
    try {
      return await this.taskRepository.updateTaskById(userId, updatedTaskData);
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }

  async deleteTaskById(userId: number): Promise<boolean> {
    try {
      return await this.taskRepository.deleteTaskById(userId);
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }

  async createTask(taskData: Partial<Task>, user: User): Promise<Task> {
    try {
      return await this.taskRepository.createTask(taskData, user);
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }

  async changeTaskStatus(taskId: number, status: TaskStatus): Promise<boolean> {
    try {
      return await this.taskRepository.changeStatus(taskId, status);
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }

  async assignTask(taskId: number, assignedUser: User): Promise<Task> {
    try {
      return await this.taskRepository.assignTask(taskId, assignedUser);
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }

  async filterTasksByStatus(
    status: TaskStatus,
    userId: number
  ): Promise<Task[]> {
    try {
      return await this.taskRepository.filterTasksByStatus(status, userId);
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }

  async searchTasksByTitleOrDescription(
    searchTerm: string,
    userId: number
  ): Promise<Task[]> {
    try {
      return await this.taskRepository.searchTasksByTitleOrDescription(
        searchTerm,
        userId
      );
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }

  async addCommentToTask(
    taskId: number,
    comment: string,
    userId: number
  ): Promise<Task | undefined> {
    try {
      return await this.taskRepository.addCommentToTask(
        taskId,
        comment,
        userId
      );
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }

  async addAttachmentToTask(
    taskId: number,
    attachmentUrls: string[],
    userId: number
  ): Promise<Task | undefined> {
    try {
      return await this.taskRepository.addAttachmentToTask(
        taskId,
        attachmentUrls,
        userId
      );
    } catch (error) {
      // Handle or log the error
      throw error;
    }
  }
}
