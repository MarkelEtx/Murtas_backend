import { Router } from "express";
import jugadorApiController from "../../controllers/jugador/jugador.api.controller.js";
const router = Router();

router.get("/", jugadorApiController.listarJugadores);

export default router;