import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { PORT } from "./utils/config.js";
import userRoutes from "./routes/user.route.js";
import categoriaRoute from "./routes/categoria.route.js";
import authRoutes from "./routes/auth.route.js";


const app = express();
app.use(json());
app.use(cors());
app.use(cookieParser());

app.use("/api/", userRoutes);
app.use("/api/", authRoutes);
app.use("/api/", categoriaRoute);


app.listen(PORT);
console.log(`Corriendo servidor en el puerto ${PORT} 🌪`);
