import { Router } from "express";
import jugadorApiController from "../../controllers/jugador/jugador.api.controller.js";
import isAuthenticated from "../../middlewares/isAuthenticated.middleware.js";
import isJugador from "../../middlewares/isJugador.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";
const router = Router();


// GET: Listar jugadores
router.get("/", jugadorApiController.listarJugadores);

// GET: Consultar jugador
router.get("/:id", jugadorApiController.buscarJugadorPorId);

// PATCH: Asociar jugador a la persona autenticada
router.patch("/asociar/:id", jugadorApiController.asociarPersona);

// POST: Crear jugador
router.post("/", isJugador, isAdmin, jugadorApiController.crearJugador);

// PUT: Modificar jugador
router.put("/:id", isJugador, isAdmin, jugadorApiController.modificarJugador);

// PATCH: Activar / desactivar jugador
router.patch("/:id/estado", isJugador, isAdmin, jugadorApiController.cambiarEstadoJugador);


export default router;