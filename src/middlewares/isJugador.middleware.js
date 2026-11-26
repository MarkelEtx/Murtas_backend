import jugadorRepository from "../repositories/jugador.repository.js";

// COMPROBAR SI TIENE JUGADOR
const isJugador = async (req, res, next) => {
    try {
        // BUSCAR JUGADOR POR ID DE PERSONA
        const jugador = await jugadorRepository.buscarPorIdPersona(req.user.id);

        if (!jugador) {
            return res.status(403).json({
                ok: false,
                message: "No tienes ningún jugador asociado"
            });
        }

        // GUARDAR JUGADOR EN REQUEST
        req.jugador = jugador;

        next();

    } catch (error) {
        console.error("Error al comprobar jugador:", error);

        return res.status(500).json({
            ok: false,
            message: "Error interno al comprobar el jugador"
        });
    }
};

export default isJugador;