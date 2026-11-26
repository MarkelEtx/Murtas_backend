import { Router } from "express";
import jugadorRouter from "./jugador.router.js";
import multaRouter from "./multa.router.js";
import tipoMultaRouter from "./tipoMulta.router.js";
import historialRouter from "./historial.router.js";
import authRouter from "./auth.router.js";

const router = Router();

router.use("/jugadores",jugadorRouter);
router.use("/multas",multaRouter);
router.use("/tiposMultas",tipoMultaRouter);
router.use("/historial",historialRouter);
router.use("/auth",authRouter);

export default router;