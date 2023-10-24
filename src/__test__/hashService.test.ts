import { hashService, compareService } from "../services/hashService";
import bcrypt from "bcrypt";

const mockPassword = {
    password: "password",
    hashedPassword: "hashedPassword",
};

const mockFailPassword = "random password";

beforeEach(() => jest.resetAllMocks());

describe("hash service test", () => {
    test("hash success", async () => {
        // @ts-ignore
        jest.spyOn(bcrypt, "hashSync").mockResolvedValueOnce("hashedPassword");

        const result = await hashService(mockPassword.password);

        expect(result).toBeDefined();
        expect(result).toBe("hashedPassword");
    });
});

describe("compare service test", () => {
    test("compare success test", async () => {
        // @ts-ignore
        jest.spyOn(bcrypt, "compareSync").mockResolvedValueOnce(true);

        const result = await compareService(
            mockPassword.password,
            mockPassword.hashedPassword
        );
        expect(result).toBeDefined();
        expect(result).toBe(true);
    });

    test("password not match test", async () => {
        // @ts-ignore
        jest.spyOn(bcrypt, "compareSync").mockResolvedValueOnce(false);

        const result = await compareService(
            mockFailPassword,
            mockPassword.hashedPassword
        );

        expect(result).toBeDefined();
        expect(result).toBe(false);
    });
});
