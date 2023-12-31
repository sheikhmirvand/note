import User from "../../user/models/userModel";
import { registerInterFace } from "./IAuthRepository";

export class AuthRepo {
    async registerUserRepo({ email, password, userName }: registerInterFace) {
        return await User.create({ userName, email, password });
    }

    async findOneUserWithEmailForAuth(email: string) {
        return await User.findOne({ email });
    }
}
