import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private userService: UserService) {}

  public async registerController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // const { username, email, password } = req.body;
      const newUser = await this.userService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  public async loginController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.userService.loginUser(email, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  public async updateProfileController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: number | undefined = req.user?.id;
      const updatedProfileData = req.body;
      const updatedUser = await this.userService.updateProfile(
        userId,
        updatedProfileData
      );
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
