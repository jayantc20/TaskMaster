import { Router } from "express";
import {
  registrationValidator,
  loginValidator,
} from "../middleware/userValidatorMiddleware";
import { UserController } from "../controllers/UserController";
import { authenticateUser } from "../middleware/authMiddleware";

const authRoutes = (userController: UserController): Router => {
  const router = Router();

  router.post(
    "/register",
    registrationValidator,
    userController.registerController.bind(userController)
  );
  router.post(
    "/login",
    loginValidator,
    userController.loginController.bind(userController)
  );
  router.put(
    "/profile",
    authenticateUser,
    userController.updateProfileController.bind(userController)
  );

  return router;
};

export default authRoutes;
