import { User } from '../../../models/user';
import { UserRepository  } from '../../repository/UserRepository';

export class UserPost {
  async post(user: User) {
    return await UserRepository.createUser(user);
  }
}