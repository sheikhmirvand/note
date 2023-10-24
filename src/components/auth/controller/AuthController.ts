import { AuthRepo } from "../repositories/AuthRepository";

class AuhtController {
    private readonly authReo: AuthRepo;
    constructor() {
        this.authReo = new AuthRepo();
    }

    register() {}
}

const authController = new AuhtController();
export default authController;
