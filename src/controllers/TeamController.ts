import { Request, Response } from "express";
import { TeamService } from "../services/TeamService";
import { Team } from "../models/Team";

export class TeamController {
  constructor(private teamService: TeamService) {}

  public async createTeam(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const owner = req.user;

      const teamData: Partial<Team> = {
        name,
        owner,
      };

      const team = await this.teamService.createTeam(teamData);
      res.status(201).json(team);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getTeamById(req: Request, res: Response): Promise<void> {
    try {
      const teamId = parseInt(req.params.id);
      const team = await this.teamService.getTeamById(teamId);
      if (!team) {
        res.status(404).json({ message: "Team not found" });
        return;
      }
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getAllTeams(req: Request, res: Response): Promise<void> {
    try {
      const teams = await this.teamService.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async updateTeam(req: Request, res: Response): Promise<void> {
    try {
      const teamId = parseInt(req.params.id);
      const { name } = req.body;
      const updatedTeam = await this.teamService.updateTeam(teamId, name);
      if (!updatedTeam) {
        res.status(404).json({ message: "Team not found" });
        return;
      }
      res.json(updatedTeam);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteTeam(req: Request, res: Response): Promise<void> {
    try {
      const teamId = parseInt(req.params.id);
      const success = await this.teamService.deleteTeam(teamId);
      if (!success) {
        res.status(404).json({ message: "Team not found" });
        return;
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async sendInvite(req: Request, res: Response): Promise<void> {
    try {
      const teamId = parseInt(req.params.id);
      const { userId } = req.body;
      const success = await this.teamService.sendInvite(teamId, userId);
      if (!success) {
        res.status(404).json({ message: "Team or user not found" });
        return;
      }
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async acceptInvite(req: Request, res: Response): Promise<void> {
    try {
      const teamId = parseInt(req.params.id);
      const userId: number | undefined = req.user?.id;
      const success = await this.teamService.acceptInvite(teamId, userId);
      if (!success) {
        res.status(404).json({ message: "Team invite not found" });
        return;
      }
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
