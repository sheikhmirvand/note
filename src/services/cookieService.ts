import { Response } from "express";

export const saveCookieService = (res: Response, token: string) => {
    return res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};
