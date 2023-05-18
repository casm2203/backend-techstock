import { Router } from "express";
import {
  getVenta,
  getVentas,
  getSearchVenta,
  addVenta
} from "../controllers/venta.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/venta", getVentas);

router.get("/venta/:id", requireToken, getVenta);

router.get("/venta/search/:search", getSearchVenta);

router.post("/venta", requireToken, addVenta);


export default router;
