import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from "typeorm";
import { Exclude, instanceToPlain } from "class-transformer";

import { Task } from "./Task";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  username: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "varchar", length: 255, select: false })
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  toJSON() {
    return instanceToPlain(this);
  }

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    tasks: Task[]
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.tasks = tasks;
  }
}
