import { Router } from "express";
import jugadorRouter from "./jugador.router.js";

const router = Router();

router.use("/jugadores",jugadorRouter)

export default router;