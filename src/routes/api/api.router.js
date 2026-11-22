import { Router } from "express";
import jugadorRouter from "./jugador.router.js";
import multaRouter from "./multa.router.js";

const router = Router();

router.use("/jugadores",jugadorRouter);
router.use("/multas",multaRouter);

export default router;