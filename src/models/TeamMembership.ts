import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Team } from "./Team";

@Entity()
export class TeamMembership {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Team)
  team!: Team;

  // constructor(id: number, user: User, team: Team) {
  //   this.id = id;
  //   this.user = user;
  //   this.team = team;
  // }
}
