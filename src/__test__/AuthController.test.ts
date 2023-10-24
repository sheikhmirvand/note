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

const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };
};

const mockUser = {
    _id: "6537fe3f05671cdd4cbfac67",
    userName: "test2",
    email: "test2@gmail.com",
    password: "$2b$10$TD/x/5uYNARp1QHlwOCaIOwfEoBgbIOpX.XdTOgOTrDf.CKdY8JcC",
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

    test("register success", () => {});
});
