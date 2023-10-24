import { genrateTokenService } from "../services/tokenService";
import jwt from "jsonwebtoken";

describe("test token service", () => {
    test("token service success return token", async () => {
        // @ts-ignore
        jest.spyOn(jwt, "sign").mockResolvedValueOnce("token");

        const result = await genrateTokenService("id");
        expect(result).toBeDefined();
        expect(result).toBe("token");
    });

    test("token", async () => {
        // @ts-ignore
        jest.spyOn(jwt, "sign").mockRejectedValue(false);
        const result = await genrateTokenService("id");
    });
});
