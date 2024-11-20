import { User } from "../../../models/user";
import { UserRepository } from "../../repository/UserRepository";

export class UserGet {
    async get(email : string): Promise<User> {
        try {
        const user: User = await UserRepository.getUserByEmail(email) as User;
        return user;
        } catch (error) {
        console.error("Error in usersHandler:", error);
        throw error;
        }
    }
}