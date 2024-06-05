import { Repository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { AuthenticationError, NotFoundError } from "../utils/errors";

const serverConfig = config.get("server");

// Define a type or interface for user registration data
interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    // Use UserRepository instead of Repository<User>
    this.userRepository = userRepository; // No need to pass the repository to UserRepository constructor
  }

  public async registerUser(userData: UserRegistrationData): Promise<any> {
    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash the password with a salt factor of 10

      // Replace the plain password with the hashed password in the user data
      const newUser: UserRegistrationData = {
        ...userData,
        password: hashedPassword,
      };
      const createdUser = await this.userRepository.createUser(newUser);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  public async loginUser(email: string, password: string): Promise<any> {
    try {
      // Login user logic using the UserRepository
      const user = await this.userRepository.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AuthenticationError("Invalid credentials");
      }

      // If credentials are valid, generate a JWT token
      const token = jwt.sign({ id: user.id }, (serverConfig as any).jwtSecret);
      return token;
    } catch (error) {
      throw error; // Propagate the error to the caller
    }
  }

  public async updateProfile(
    userId: number | undefined,
    updatedProfileData: Partial<User>
  ): Promise<User | undefined> {
    try {
      const updatedUser = await this.userRepository.updateUserProfile(
        userId,
        updatedProfileData
      );
      if (!updatedUser) {
        throw new NotFoundError("User not found");
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
