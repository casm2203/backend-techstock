import { Router } from "express";
import {
  getCategoria,
  getCategorias,
  addCategoria,
  updateCategoria,
  deleteCategoria,
  releaseCategoria,
} from "../controllers/categoria.controller.js";
import { bodyAddCategoriaValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/categoria", getCategorias);

router.get("/categoria/:id", requireToken, getCategoria);

router.post("/categoria", bodyAddCategoriaValidator, addCategoria);

router.put("/categoria/:id", updateCategoria);

router.delete("/categoria/:id", deleteCategoria);

router.patch("/categoria/:id", releaseCategoria);

export default router;
