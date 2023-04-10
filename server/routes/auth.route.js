import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { bodyLoginValidator } from "../middlewares/validatorManager.js";

const router = Router();

router.post("/login", bodyLoginValidator, login);

router.post("/logout", logout);

export default router;
