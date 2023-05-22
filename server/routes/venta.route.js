import { Router } from "express";
import {
  getVenta,
  getVentasDashboardDay,
  getVentasDashboardWeek,
  getSearchVenta,
  getHistoryVentas,
  addVenta
} from "../controllers/venta.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/ventaDashboardDay", getVentasDashboardDay);

router.get("/ventaDashboardWeek", getVentasDashboardWeek);

router.get("/historialVentas", getHistoryVentas);

router.get("/venta/:id", requireToken, getVenta);

router.get("/venta/search/:search", getSearchVenta);

router.post("/venta", requireToken, addVenta);


export default router;
