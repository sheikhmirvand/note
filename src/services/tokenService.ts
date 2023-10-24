import jwt from "jsonwebtoken";

export const genrateTokenService = async (id: any) => {
    try {
        return await jwt.sign(
            { id },
            process.env.JWT_SECRET as unknown as string,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        if (error instanceof Error) console.log(error.message);
    }
};
