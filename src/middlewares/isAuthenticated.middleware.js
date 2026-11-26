import jwt from "jsonwebtoken";
import env from "../config/env.js";

// COMPROBAR AUTENTICACIÓN
const isAuthenticated = (req, res, next) => {
    try {
        // OBTENER TOKEN
        const authHeader = req.headers.authorization;

        const token = req.cookies?.token ||
            (authHeader?.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : null);

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: "No estás autenticado"
            });
        }

        // VERIFICAR TOKEN
        const decoded = jwt.verify(token, env.JWT_SECRET);

        // GUARDAR ID DE PERSONA
        req.user = {
            id: decoded._id
        };

        next();

    } catch (error) {
        console.error("Error de autenticación:", error);

        return res.status(401).json({
            ok: false,
            message: "Token no válido o expirado"
        });
    }
};

export default isAuthenticated;