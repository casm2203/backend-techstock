import { Router } from "express";
import {
  getCategoria,
  getCategorias,
  addCategoria,
  updateCategoria,
  deleteCategoria,
  releaseCategoria,
} from "../controllers/categoria.controller.js";
import { bodyAddCaterogiaValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/caterogia", getCategoria);

router.get("/caterogia/:id", requireToken, getCategorias);

router.post("/caterogia", bodyAddCaterogiaValidator, addCategoria);

router.put("/caterogia/:id", updateCategoria);

router.delete("/caterogia/:id", deleteCategoria);

router.patch("/caterogia/:id", releaseCategoria);

export default router;
