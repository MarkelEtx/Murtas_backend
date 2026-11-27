import { Router } from "express";
import jugadorRouter from "./jugador.router.js";
import multaRouter from "./multa.router.js";
import tipoMultaRouter from "./tipoMulta.router.js";
import historialRouter from "./historial.router.js";
import authRouter from "./auth.router.js";
import isAuthenticated from "../../middlewares/isAuthenticated.middleware.js";
import isJugador from "../../middlewares/isJugador.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";

const router = Router();

router.use("/jugadores", isAuthenticated, jugadorRouter);
router.use("/multas", isAuthenticated, isJugador, multaRouter);
router.use("/tiposMultas", isAuthenticated, isJugador, isAdmin, tipoMultaRouter);
router.use("/historial", isAuthenticated, isJugador, isAdmin, historialRouter);
router.use("/auth", authRouter); //historial login

export default router;