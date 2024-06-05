import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { TaskComment } from "./TaskComment";
import { TaskAttachment } from "./TaskAttachment";

export enum TaskStatus {
  Open = "Open",
  InProgress = "InProgress",
  Completed = "Completed",
  Pending = "Pending",
  Cancelled = "Cancelled",
  Deferred = "Deferred",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  dueDate: Date;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.Open })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => TaskComment, (comment) => comment.task)
  comments: TaskComment[] | undefined;

  @OneToMany(() => TaskAttachment, (attachment) => attachment.task)
  attachments: TaskAttachment[] | undefined;

  constructor(
    id: number,
    title: string,
    description: string,
    dueDate: Date = new Date(),
    status: TaskStatus,
    user: User
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
    this.user = user;
  }
}
