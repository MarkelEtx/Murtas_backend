import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepository from "../../repositories/auth.repository.js";
import { env } from "../../config/env.js";

// import { HttpError } from "../utils/HttpError.js";

// Opciones de la cookie del token (las mismas al crearla y al borrarla)
const TOKEN_COOKIE_OPTIONS = {
    httpOnly: true, // el JavaScript del navegador no puede leerla (protege frente a XSS)
    sameSite: "strict", // solo se envía desde nuestra propia web (protege frente a CSRF)
    secure: env.NODE_ENV === "production", // solo por HTTPS en producción (en local no hay HTTPS)
};
const TOKEN_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas, igual que el token

// REGISTRAR PERSONA
const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // VALIDAR CAMPOS
        if (
            typeof nombre !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !nombre.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            return res.status(400).json({
                ok: false,
                message: "Todos los campos son obligatorios"
            });
        }

        // COMPROBAR SI EXISTE EL EMAIL
        const personaExistente = await authRepository.buscarPorEmail(email.trim());

        if (personaExistente) {
            return res.status(409).json({
                ok: false,
                message: "El email ya está registrado"
            });
        }

        // CIFRAR CONTRASEÑA
        const contrasena = await bcrypt.hash(password, 10);

        // CREAR PERSONA
        const persona = await authRepository.crear({
            nombre: nombre.trim(),
            email: email.trim(),
            contrasena
        });

        return res.status(201).json({
            ok: true,
            message: "Persona registrada correctamente",
            data: {
                id: persona.id,
                nombre: persona.nombre,
                email: persona.email
            }
        });

    } catch (error) {
        console.error("Error al registrar persona:", error);

        return res.status(500).json({
            ok: false,
            message: "Error interno al registrar la persona"
        });
    }
};

// INICIAR SESIÓN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // VALIDAR CAMPOS
        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({
                ok: false,
                message: "El email y la contraseña son obligatorios"
            });
        }

        // BUSCAR PERSONA POR EMAIL
        const persona = await authRepository.buscarPorEmail(email.trim());

        // COMPROBAR CREDENCIALES
        if (!persona || !(await bcrypt.compare(password, persona.contrasena))) {
            return res.status(401).json({
                ok: false,
                message: "Credenciales incorrectas"
            });
        }

        // GENERAR PAYLOAD
        const payload = {
            _id: persona.id.toString()
        };

        // GENERAR TOKEN
        const token = jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: "24h"
        });

        // GUARDAR TOKEN EN COOKIE
        res.cookie("token", token, {
            ...TOKEN_COOKIE_OPTIONS,
            maxAge: TOKEN_DURATION_MS
        });

        // DEVOLVER RESPUESTA
        return res.status(200).json({
            ok: true,
            message: "Inicio de sesión correcto",
            data: {
                token,
                user: {
                    id: persona.id,
                    nombre: persona.nombre,
                    email: persona.email
                }
            }
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        return res.status(500).json({
            ok: false,
            message: "Error interno al iniciar sesión"
        });
    }
};

export default {
    register,
    login
}
