import { body } from "express-validator";

export const registerValidator = () => {
    return [
        body("userName")
            .notEmpty()
            .isLength({ min: 3, max: 25 })
            .withMessage("enter valid user name"),
        body("email").notEmpty().isEmail().withMessage("enter valid email"),
        body("password")
            .notEmpty()
            .isLength({ min: 8, max: 50 })
            .withMessage("enter your password (must 8 char)"),
    ];
};
