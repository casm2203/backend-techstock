import { Router } from "express";
import {
  getProducto,
  getProductos,
  getSearchProducto,
  getProductosEscasos,
  addProducto,
  updateProducto,
  deleteProducto,
  releaseProducto,
} from "../controllers/producto.controller.js";
import { bodyAddProductoValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/producto", getProductos);

router.get("/productosEscasos", getProductosEscasos);

router.get("/producto/:id", requireToken, getProducto);

router.get("/producto/search/:search", getSearchProducto);

router.post("/producto", bodyAddProductoValidator, addProducto);

router.put("/producto/:id", updateProducto);

router.delete("/producto/:id", deleteProducto);

router.patch("/producto/:id", releaseProducto);

export default router;
