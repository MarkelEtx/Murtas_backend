import { Router } from "express";
import authApiController from "../../controllers/auth/auth.api.controller.js";
import isAuthenticated from "../../middlewares/isAuthenticated.middleware.js";
import isJugador from "../../middlewares/isJugador.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";
const router = Router();

router.post("/register", authApiController.register);
router.post("/login", authApiController.login);
router.post("/logout", authApiController.logout);
router.get("/me", isAuthenticated, authApiController.me);


export default router;