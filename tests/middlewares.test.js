import { describe, it, expect, vi } from "vitest";
import isAdmin from "../src/middlewares/isAdmin.middleware.js";

describe("Middleware isAdmin", () => {

    // Comprobamos que un administrador puede acceder
    it("debe permitir el acceso si el jugador es administrador", () => {

        // ARRANGE: preparamos los datos que necesita el middleware

        // Simulamos una petición HTTP donde el jugador es capitán
        const req = {
            jugador: {
                capitan: true
            }
        };

        // Simulamos el objeto response de Express
        // vi.fn() crea funciones simuladas para comprobar si se ejecutan
        // mockReturnThis() permite encadenar res.status().json()
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        // Simulamos la función next() de Express
        // Nos permitirá comprobar si el middleware permite continuar
        const next = vi.fn();


        // ACT: ejecutamos el middleware con los objetos simulados
        isAdmin(req, res, next);


        // ASSERT: comprobamos que el comportamiento es el esperado

        // Comprobamos que se ha llamado a next()
        expect(next).toHaveBeenCalled();

        // Comprobamos que no se ha enviado ninguna respuesta de error
        expect(res.status).not.toHaveBeenCalled();

    });
    it("debe rechazar el acceso si el jugador no es administrador", () => {
        const req = {
            jugador: {
                capitan: false
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const next = vi.fn();

        isAdmin(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            ok: false,
            message: "No tienes permisos de administrador"
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("debe rechazar el acceso si no existe un jugador", () => {
        const req = {};

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const next = vi.fn();

        isAdmin(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });

});