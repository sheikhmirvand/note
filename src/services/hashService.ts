import { hashSync, compareSync } from "bcrypt";

export const hashService = (password: string): string => {
    return hashSync(password, 10);
};

export const compareService = () => {
    return compareSync(
        "salam",
        "$2b$10$aN6NjK3baC2pzAur5qKDgOG1pULDL8fgWQpqFgX/DmWx.VPPC9RAG"
    );
};
