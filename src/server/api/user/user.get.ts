import { User } from "../../../models/user";
import { UserRepository } from "../../repository/UserRepository";

export class UserGet {
    async get(): Promise<User[]> {
        return UserRepository.getUsers();
    }
}