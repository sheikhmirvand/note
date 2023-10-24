import { AuthController } from "../components/auth/controller/AuthController";
import User from "../components/user/models/userModel";

const mockRequest = () => {
    return {
        body: {
            userName: "test",
            email: "test@gmail.com",
            password: "12345678",
        },
    };
};

jest.mock("../services/hashService", () => ({
    hashService: jest.fn().mockReturnValueOnce("hashedPassword"),
    compareService: jest
        .fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true),
}));

jest.mock("../services/tokenService", () => ({
    genrateTokenService: jest.fn(() => "token"),
}));

const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        cookie: jest.fn().mockReturnThis(),
    };
};

const mockUser = {
    _id: "6537fe3f05671cdd4cbfac67",
    userName: "test",
    email: "test@gmail.com",
    password: "hashedPassword",
    notes: [],
    createdAt: "2023-10-24T17:26:23.533Z",
    updatedAt: "2023-10-24T17:26:23.533Z",
    __v: 0,
};

describe("auth controller register test", () => {
    test("error for exists user", async () => {
        const authController = new AuthController();

        jest.spyOn(User, "findOne").mockResolvedValueOnce(mockUser);

        const mockReq = mockRequest();
        const mockRes = mockResponse();

        //@ts-ignore
        await authController.register(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "user already exists",
        });
    });

    test("register success", async () => {
        const authController = new AuthController();

        // @ts-ignore
        jest.spyOn(User, "findOne").mockResolvedValueOnce(false);
        //@ts-ignore
        jest.spyOn(User, "create").mockResolvedValueOnce(mockUser);
        const mockReq = mockRequest();
        const mockRes = mockResponse();

        // @ts-ignore
        await authController.register(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
    });
});

describe("login controller test", () => {
    test("no enter email or password", async () => {
        const authController = new AuthController();

        // @ts-ignore
        const mockReq = (mockRequest().body = { body: {} });
        const mockRes = mockResponse();

        // @ts-ignore
        await authController.login(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "complate all field",
        });
    });

    test("user not found error", async () => {
        const authController = new AuthController();
        // @ts-ignore
        jest.spyOn(User, "findOne").mockResolvedValueOnce(false);

        const mockReq = (mockRequest().body = {
            // @ts-ignore
            body: { email: "alaki", password: "12345678" },
        });
        const mockRes = mockResponse();
        // @ts-ignore
        await authController.login(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "user not found register first",
        });
    });

    test("password not valid error test", async () => {
        const authController = new AuthController();

        // @ts-ignore
        jest.spyOn(User, "findOne").mockResolvedValueOnce(mockUser);

        const mockReq = mockRequest();
        const mockRes = mockResponse();

        // @ts-ignore
        await authController.login(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "email or password not valid",
        });
    });

    test("login success", async () => {
        const authController = new AuthController();

        // @ts-ignore
        jest.spyOn(User, "findOne").mockResolvedValueOnce(mockUser);

        const mockReq = mockRequest();
        const mockRes = mockResponse();

        // @ts-ignore
        await authController.login(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
    });
});
