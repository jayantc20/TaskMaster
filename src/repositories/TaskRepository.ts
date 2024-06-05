import { Repository, DataSource } from "typeorm";
import { Database } from "../utils/database/database";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { TaskComment } from "../models/TaskComment";
import { TaskStatus } from "../models/Task";
import { TaskAttachment } from "../models/TaskAttachment";

export class TaskRepository {
  private repository: Repository<Task>;
  private userRepository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Task);
    this.userRepository = dataSource.getRepository(User);
  }

  async findTasksByUserId(userId: number): Promise<Task[]> {
    const tasks = await this.repository.find({
      where: { user: { id: userId } },
    });
    return tasks;
  }

  async getTaskById(taskId: number): Promise<Task | null> {
    return await this.repository.findOne({ where: { id: taskId } });
  }

  async updateTaskById(
    taskId: number,
    updatedTaskData: Partial<Task>
  ): Promise<Task | undefined> {
    const task = await this.repository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    Object.assign(task, updatedTaskData);
    return await this.repository.save(task);
  }

  async deleteTaskById(taskId: number): Promise<boolean> {
    const result = await this.repository.delete(taskId);
    return result.affected !== 0;
  }

  async createTask(taskData: Partial<Task>, user: User): Promise<Task> {
    const newTask = this.repository.create({ ...taskData, user });
    return this.repository.save(newTask);
  }

  async changeStatus(taskId: number, status: TaskStatus): Promise<boolean> {
    const task = await this.repository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }
    task.status = status; // Update task status to the provided status
    await this.repository.save(task);
    return true;
  }

  async assignTask(taskId: number, assignedUser: User): Promise<Task> {
    const task = await this.repository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }
    task.user = assignedUser;
    return this.repository.save(task);
  }

  async filterTasksByStatus(
    status: TaskStatus,
    userId: number
  ): Promise<Task[]> {
    const tasks = await this.repository.find({
      where: { status, user: { id: userId } },
    });
    return tasks;
  }

  async searchTasksByTitleOrDescription(
    searchTerm: string,
    userId: number
  ): Promise<Task[]> {
    const tasks = await this.repository
      .createQueryBuilder("task")
      .where(
        "task.title LIKE :searchTerm OR task.description LIKE :searchTerm",
        {
          searchTerm: `%${searchTerm}%`,
        }
      )
      .andWhere("task.user.id = :userId", { userId })
      .getMany();
    return tasks;
  }

  async addCommentToTask(
    taskId: number,
    comment: string,
    userId: number
  ): Promise<Task | undefined> {
    const task = await this.repository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    // Retrieve the user by userId
    const user = await this.userRepository.findOne({ where: { id: userId } }); // Assuming you have a userRepository

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Create a new TaskComment entity and associate it with the task and user
    const newComment = new TaskComment(comment, user, task);

    // Ensure task.comments is initialized as an array
    task.comments = task.comments || [];
    // Push the new comment entity to the existing array
    task.comments.push(newComment);

    return this.repository.save(task);
  }

  async addAttachmentToTask(
    taskId: number,
    attachmentUrls: string[],
    userId: number
  ): Promise<Task | undefined> {
    const task = await this.repository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }
    // Retrieve the user by userId
    const user = await this.userRepository.findOne({ where: { id: userId } }); // Assuming you have a userRepository

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const attachments = attachmentUrls.map(
      (url) => new TaskAttachment(url, user, task)
    );
    task.attachments = task.attachments || [];
    task.attachments.push(...attachments);
    // Save the updated task entity
    return this.repository.save(task);
  }
}
