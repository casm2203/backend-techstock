import { Router } from "express";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  releaseUser,
} from "../controllers/user.controller.js";
import { bodyAddUserValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/user", getUsers);

router.get("/user/:id", requireToken, getUser);

router.post("/user", bodyAddUserValidator, addUser);

router.put("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

router.patch("/user/:id", releaseUser);

export default router;
