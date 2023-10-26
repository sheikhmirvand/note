import { body } from "express-validator";

export const createFolderValidator = () => {
    return [
        body("title")
            .isString()
            .notEmpty()
            .withMessage("please enter a title for folder"),
    ];
};
