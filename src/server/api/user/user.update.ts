import { User } from '../../../models/user';
import { UserRepository } from '../../repository/UserRepository';

export class UserUpdate {
  async update(user: User) {
    try {
        return await UserRepository.saveUserByEmail(user.email, user);
      } catch (error) {
        console.error(error);
        throw new Error("Error writing to file");
      }
  }
}