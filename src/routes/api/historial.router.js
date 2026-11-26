import { Router } from "express";
import historialApiController from "../../controllers/historial/historial.api.controller.js";
import isAuthenticated from "../../middlewares/isAuthenticated.middleware.js";
import isJugador from "../../middlewares/isJugador.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";


const router = Router();

// GET: Listar historial
router.get("/", isAuthenticated, isJugador, historialApiController.listarHistorial);

// GET: Consultar jugador
router.get("/:id", historialApiController.buscarHistorialPorId);

export default router;