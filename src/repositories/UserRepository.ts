import { Repository, DataSource } from "typeorm";
import { Database } from "../utils/database/database";
import { User } from "../models/User";

export class UserRepository {
  private repository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email } });
    return user || undefined;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.repository.create(userData);
    return this.repository.save(newUser);
  }

  async updateUserProfile(
    userId: number | undefined,
    profileData: Partial<User>
  ): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { id: userId } });
    if (user) {
      Object.assign(user, profileData);
      return this.repository.save(user);
    }
    return undefined;
  }
}
