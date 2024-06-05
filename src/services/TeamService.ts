import { TeamRepository } from "../repositories/TeamRepository";
import { Team } from "../models/Team";

export class TeamService {
  private teamRepository: TeamRepository;

  //   constructor() {
  //     this.teamRepository = new TeamRepository();
  //   }

  constructor(teamRepository: TeamRepository) {
    this.teamRepository = teamRepository;
  }

  async createTeam(teamData: Partial<Team>): Promise<Team> {
    return this.teamRepository.createTeam(teamData);
  }

  async getTeamById(teamId: number): Promise<Team | null> {
    return this.teamRepository.getTeamById(teamId);
  }

  async getAllTeams(): Promise<Team[]> {
    return this.teamRepository.getAllTeams();
  }

  async updateTeam(
    teamId: number,
    updatedTeamData: Partial<Team>
  ): Promise<Team | undefined> {
    return this.teamRepository.updateTeam(teamId, updatedTeamData);
  }

  async deleteTeam(teamId: number): Promise<boolean> {
    return this.teamRepository.deleteTeam(teamId);
  }

  async sendInvite(teamId: number, userId: number): Promise<boolean> {
    return this.teamRepository.sendInvite(teamId, userId);
  }

  async acceptInvite(
    teamId: number,
    userId: number | undefined
  ): Promise<boolean> {
    return this.teamRepository.acceptInvite(teamId, userId);
  }
}
