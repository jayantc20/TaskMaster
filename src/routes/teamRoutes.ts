import { Router } from "express";
import { TeamController } from "../controllers/TeamController";
import { authenticateUser } from "../middleware/authMiddleware";
import {
  createTeamValidator,
  updateTeamValidator,
  inviteValidator,
} from "../middleware/teamValidatorMiddleware";

const teamRouter = (teamController: TeamController): Router => {
  const router = Router();

  router.post(
    "/",
    authenticateUser,
    createTeamValidator,
    teamController.createTeam.bind(teamController)
  );
  router.get(
    "/:id",
    authenticateUser,
    teamController.getTeamById.bind(teamController)
  );
  router.get(
    "/",
    authenticateUser,
    teamController.getAllTeams.bind(teamController)
  );
  router.put(
    "/:id",
    authenticateUser,
    updateTeamValidator,
    teamController.updateTeam.bind(teamController)
  );
  router.delete(
    "/:id",
    authenticateUser,
    teamController.deleteTeam.bind(teamController)
  );
  router.post(
    "/invite/send/:id",
    authenticateUser,
    inviteValidator,
    teamController.sendInvite.bind(teamController)
  );
  router.post(
    "/invite/accept/:id",
    authenticateUser,
    teamController.acceptInvite.bind(teamController)
  );
  return router;
};

export default teamRouter;
