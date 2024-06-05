import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  ownerId: number;

  @ManyToOne(() => User)
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @Column("simple-array", { default: [] })
  invitations: number[];

  constructor(
    id: number,
    name: string,
    ownerId: number,
    owner: User,
    members: User[],
    invitations: number[]
  ) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.owner = owner;
    this.members = members;
    this.invitations = invitations;
  }
}
