import { hashSync, compareSync } from "bcrypt";

export const hashService = (password: string): string => {
    return hashSync(password, 10);
};

export const compareService = async (
    password: string,
    userPassword: string
) => {
    return await compareSync(password, userPassword);
};
