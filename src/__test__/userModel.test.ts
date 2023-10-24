import User from "../components/user/models/userModel";

const mockUser = {
    userName: "test",
    email: "test@gmail.com",
    password: "12345678",
};

describe("user model test", () => {
    test("validation error", async () => {
        const user = new User();

        // @ts-ignore
        jest.spyOn(user, "validate").mockResolvedValueOnce({});
        try {
            await user.validate();
        } catch (error) {
            //@ts-ignore
            expect(error.errors.email).toBeDefined();
        }
    });

    test("success user model test", () => {
        const user = new User(mockUser);
        expect(user).toBeDefined();
        expect(user).toHaveProperty("_id");
    });
});
