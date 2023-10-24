import { Router } from "express";
import authController from "../controller/AuthController";
import { registerValidator } from "../validators/authValidator";

// init router
const router = Router();

// register user => api/v1/auth/register -> POST
router.post("/register", registerValidator(), authController.register);

export default router;
