import { Router } from "express";
import tipoMultaApiController from "../../controllers/tipoMulta/tipoMulta.api.controller.js";
const router = Router();

// LISTAR TIPOS DE MULTAS
router.get("/", tipoMultaApiController.listarTiposMultas);

// VER TIPO DE MULTA
router.get("/:id", tipoMultaApiController.buscarTipoMultaPorId);

// CREAR TIPO DE MULTA
router.post("/", tipoMultaApiController.crearTipoMulta);

// MODIFICAR TIPO DE MULTA
router.put("/:id", tipoMultaApiController.modificarTipoMulta);

// ANULAR TIPO DE MULTA
router.patch("/:id/anular", tipoMultaApiController.anularTipoMulta);

export default router;