import { Request, Response } from "express";
import { AuthRepo } from "../repositories/AuthRepository";
import { validationResult } from "express-validator";
import { hashService } from "../../../services/hashService";
import { genrateToken } from "../../../services/tokenService";

export class AuthController {
    private readonly authReo: AuthRepo;
    constructor() {
        this.authReo = new AuthRepo();
    }

    register = async (req: Request, res: Response) => {
        try {
            const { userName, email, password } = req.body;

            // check validation body
            const result = validationResult(req);
            if (!result.isEmpty()) return res.status(400).json(result.array());

            // check exsist user
            const exUser = await this.authReo.findOneUserWithEmailForAuth(
                email
            );
            if (exUser)
                return res.status(400).json({ message: "user already exists" });

            // hash password
            const hashedPassword = hashService(password);

            // create new User
            const user = await this.authReo.registerUserRepo({
                userName,
                email,
                password: hashedPassword,
            });

            // genrate token
            const token = await genrateToken(user._id);

            // set token in cookie
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            res.send({ user, token });
        } catch (error) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
        } catch (error) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    };
}
