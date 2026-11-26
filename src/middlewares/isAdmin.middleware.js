const isAdmin = (req, res, next) => {
    try {
        // COMPROBAR SI ES CAPITÁN
        if (!req.jugador || !req.jugador.capitan) {
            return res.status(403).json({
                ok: false,
                message: "No tienes permisos de administrador"
            });
        }

        next();

    } catch (error) {
        console.error("Error al comprobar administrador:", error);

        return res.status(500).json({
            ok: false,
            message: "Error interno al comprobar los permisos"
        });
    }
};

export default isAdmin;