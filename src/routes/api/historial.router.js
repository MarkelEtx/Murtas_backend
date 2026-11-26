import { Router } from "express";
import historialApiController from "../../controllers/historial/historial.api.controller.js";

const router = Router();

// GET: Listar historial
router.get("/", historialApiController.listarHistorial);

// GET: Consultar jugador
router.get("/:id", historialApiController.buscarHistorialPorId);

export default router;