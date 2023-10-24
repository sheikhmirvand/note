import { Request, Response } from "express";
import { AuthRepo } from "../repositories/AuthRepository";
import { validationResult } from "express-validator";
import { compareService, hashService } from "../../../services/hashService";
import { genrateTokenService } from "../../../services/tokenService";
import { saveCookieService } from "../../../services/cookieService";

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
            const token = await genrateTokenService(user._id);

            // set token in cookie
            saveCookieService(res, <string>token);

            res.json({ user, token });
        } catch (error) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            // get data
            const { email, password } = req.body;
            // check data from body
            if (!email || !password)
                return res.status(400).json({ message: "complate all field" });

            // find user from data base
            const user = await this.authReo.findOneUserWithEmailForAuth(email);
            // check for exists user
            if (!user)
                return res
                    .status(404)
                    .json({ message: "user not found register first" });

            // check password
            const isMatch = compareService(password, user.password);
            if (!isMatch)
                return res
                    .status(400)
                    .json({ message: "email or password not valid" });

            // genrate token
            const token = await genrateTokenService(user._id);

            // save token in cookie
            saveCookieService(res, <string>token);

            res.json({ user, token });
        } catch (error) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    };
}
