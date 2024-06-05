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
export class TaskComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  comment: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Task, (task) => task.comments)
  @JoinColumn({ name: "taskId" })
  task: Task;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  constructor(
    comment: string,
    user: User,
    task: Task,
    createdAt: Date = new Date()
  ) {
    this.comment = comment;
    this.user = user;
    this.task = task;
    this.createdAt = createdAt;
  } 
}
