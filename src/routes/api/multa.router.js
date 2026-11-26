import { Router } from "express";
import multaApiController from "../../controllers/multa/multa.api.controller.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";

const router = Router();

// GET: Listar todas las multas
router.get("/", multaApiController.listarMultas);

// GET: FILTRAR TIPOS DE MULTAS
router.get("/filtrar", multaApiController.obtenerMultasFiltradas);

// GET: Consultar una multa
router.get("/:id", multaApiController.buscarMultaPorId);

// POST: Asignar una multa
router.post("/", isAdmin, multaApiController.crearMulta);

// PUT: Modificar una multa
router.put("/:id", isAdmin, multaApiController.modificarMulta);

// PATCH: Registrar pago
router.patch("/:id/pagar", multaApiController.pagarMulta);

// PATCH: Anular multa
router.patch("/:id/anular", isAdmin, multaApiController.anularMulta);



export default router;