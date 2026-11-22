import { Router } from "express";
import jugadorApiController from "../../controllers/jugador/jugador.api.controller.js";
const router = Router();

// GET: Listar jugadores
router.get("/", jugadorApiController.listarJugadores);

// GET: Consultar multas de un jugador
router.get("/:id/multas", jugadorApiController.listarMultasJugador);

// GET: Consultar jugador
router.get("/:id", jugadorApiController.buscarJugadorPorId);

export default router;