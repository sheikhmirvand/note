import User from "../../user/router/userModel";
import { registerInterFace } from "./IAuthRepository";

export class AuthRepo {
    async registerUserRepo({ email, password, userName }: registerInterFace) {
        return await User.create({ userName, email, password });
    }
}
