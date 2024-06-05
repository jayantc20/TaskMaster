import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Task } from "./Task";
import { User } from "./User";

@Entity()
export class TaskAttachment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Task, (task) => task.attachments)
  @JoinColumn({ name: "taskId" })
  task: Task;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  constructor(
    url: string,
    user: User,
    task: Task,
    createdAt: Date = new Date()
  ) {
    this.url = url;
    this.user = user;
    this.task = task;
    this.createdAt = createdAt;
  }
}
