import { Router } from "express";
import authApiController from "../../controllers/auth/auth.api.controller.js";
const router = Router();

router.post("/register", authApiController.register);
router.post("/login", authApiController.login);
// authRouter.post("/logout", authController.logout);
// authRouter.get("/me", isAuthenticated, authController.me);


export default router;