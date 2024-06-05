import { Repository, DataSource } from "typeorm";
import { Database } from "../utils/database/database";
import { Team } from "../models/Team";
import { TeamMembership } from "../models/TeamMembership";

export class TeamRepository {
  private teamRepository: Repository<Team>;
  private teamMembershipRepository: Repository<TeamMembership>;

  constructor(dataSource: DataSource) {
    this.teamRepository = dataSource.getRepository(Team);
    this.teamMembershipRepository = dataSource.getRepository(TeamMembership);
  }

  async createTeam(teamData: Partial<Team>): Promise<Team> {
    const newTeam = this.teamRepository.create(teamData);
    return this.teamRepository.save(newTeam);
  }

  async getTeamById(teamId: number): Promise<Team | null> {
    const team = await this.teamRepository.findOne({ where: { id: teamId } });
    return team;
  }

  async getAllTeams(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async updateTeam(
    teamId: number,
    updatedTeamData: Partial<Team>
  ): Promise<Team | undefined> {
    const team = await this.getTeamById(teamId);
    if (team) {
      Object.assign(team, updatedTeamData);
      return this.teamRepository.save(team);
    }
    return undefined;
  }

  async deleteTeam(teamId: number): Promise<boolean> {
    const result = await this.teamRepository.delete(teamId);
    return result.affected !== 0;
  }

  async sendInvite(teamId: number, userId: number): Promise<boolean> {
    try {
      const team = await this.teamRepository.findOne({ where: { id: teamId } });
      if (!team) {
        throw new Error(`Team with ID ${teamId} not found`);
      }

      // Include relations using the find method
      const teamWithMembers = await this.teamRepository
        .createQueryBuilder("team")
        .leftJoinAndSelect("team.members", "members")
        .where("team.id = :teamId", { teamId })
        .getOne();

      // Now you can access members directly from teamWithMembers
      if (!teamWithMembers) {
        throw new Error(`Team with ID ${teamId} not found`);
      }

      // Check if the user is already a member of the team
      const existingMembership = team.members.find(
        (members) => members.id === userId
      );
      if (existingMembership) {
        throw new Error(
          `User with ID ${userId} is already a member of the team`
        );
      }

      // Add an invitation for the user to join the team
      const invitation = new TeamMembership();
      invitation.user = { id: userId } as any; // Assuming userId is present in User entity
      invitation.team = team;
      await this.teamMembershipRepository.save(invitation);

      return true; // Successfully sent invitation
    } catch (error) {
      console.error("Error sending team invitation:", error);
      return false; // Failed to send invitation
    }
  }

  async acceptInvite(
    teamId: number,
    userId: number | undefined
  ): Promise<boolean> {
    try {
      const team = await this.teamRepository.findOne({ where: { id: teamId } });
      if (!team) {
        throw new Error(`Team with ID ${teamId} not found`);
      }

      // Check if there's an invitation for the user to join the team
      const invitation = team.members.find((member) => member.id === userId);
      if (!invitation) {
        throw new Error(
          `User with ID ${userId} does not have a pending invitation to join the team`
        );
      }

      // Remove the invitation and add the user as a member of the team
      team.members = team.members.filter((members) => members !== invitation);
      await this.teamRepository.save(team);

      return true; // Successfully accepted invitation
    } catch (error) {
      console.error("Error accepting team invitation:", error);
      return false; // Failed to accept invitation
    }
  }
}
