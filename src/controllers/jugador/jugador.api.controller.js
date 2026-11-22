import jugadorRepository from "../../repositories/jugador.repository.js"


// LISTAR JUGADORES
const listarJugadores = async (req, res) => {
    try {
        const jugadores = await jugadorRepository.listarJugadores();

        return res.status(200).json({
            ok: true,
            data: jugadores
        });

    } catch (error) {
        console.error("Error al listar jugadores:", error);

        return res.status(500).json({
            ok: false,
            message: "Error al obtener los jugadores"
        });
    }
};


const listarMultasJugador = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                message: "ID de jugador no válido"
            })
        }
        const multas = await jugadorRepository.listarMultasJugador(id);

        if (multas === null) {
            return res.status(404).json({
                ok: false,
                message: "Jugador no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            data: multas
        });

    } catch (error) {
        console.error("Error al consultar multas:", error);

        return res.status(500).json({
            ok: false,
            message: "Error al obtener las multas del jugador"
        });

    }
}

const buscarJugadorPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                message: "ID de jugador no válido"
            })
        }

        const jugador = await jugadorRepository.buscarJugadorPorId(id);

        if (!jugador) {
            return res.status(404).json({
                ok: false,
                message: "Jugador no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            data: jugador
        });

    } catch (error) {
        console.error("Error al buscar jugador:", error);

        return res.status(500).json({
            ok: false,
            message: "Error al obtener el jugador"
        });
    }
}

const crearJugador = async (req, res) => {
    try {
        const { id_persona, nombre, capitan, posicion, dorsal, fecha_alta } = req.body;

        if (
            !nombre ||
            posicion === undefined ||
            dorsal === undefined
        ) {
            return res.status(400).json({
                ok: false,
                message: "Nombre, posición y dorsal son obligatorios"
            });
        }

        const jugador = await jugadorRepository.crearJugador({
            id_persona,
            nombre,
            capitan,
            posicion,
            dorsal,
            fecha_alta
        });

        return res.status(201).json({
            ok: true,
            message: "Jugador creado correctamente",
            data: jugador
        });

    } catch (error) {
        console.error("Error al crear jugador:", error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                ok: false,
                message: "La persona ya está asociada a otro jugador"
            });
        }

        if (
            error.name === "SequelizeValidationError" ||
            error.name === "SequelizeForeignKeyConstraintError"
        ) {
            return res.status(400).json({
                ok: false,
                message: "Los datos del jugador no son válidos"
            });
        }

        return res.status(500).json({
            ok: false,
            message: "Error al crear el jugador"
        });
    }
}

const cambiarEstadoJugador = async (req, res) => {
    try {
        const { id } = req.params;
        const { activo } = req.body;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID de jugador no válido"
            });
        }

        if (typeof activo !== "boolean") {
            return res.status(400).json({
                ok: false,
                mensaje: "El campo activo debe ser true o false"
            });
        }

        const jugador = await jugadorRepository.cambiarEstadoJugador(
            id,
            activo
        );

        if (!jugador) {
            return res.status(404).json({
                ok: false,
                mensaje: "Jugador no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            mensaje: activo
                ? "Jugador activado correctamente"
                : "Jugador desactivado correctamente",
            data: jugador
        });

    } catch (error) {
        console.error("Error al cambiar estado:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al cambiar el estado del jugador"
        });
    }
}

// MODIFICAR JUGADOR
const modificarJugador = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID de jugador no válido"
            });
        }

        const jugador = await jugadorRepository.modificarJugador(
            id,
            req.body
        );

        if (!jugador) {
            return res.status(404).json({
                ok: false,
                mensaje: "Jugador no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            mensaje: "Jugador modificado correctamente",
            data: jugador
        });

    } catch (error) {
        console.error("Error al modificar jugador:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al modificar el jugador"
        });
    }
};

export default {
    listarJugadores,
    listarMultasJugador,
    buscarJugadorPorId,
    crearJugador,
    cambiarEstadoJugador,
    modificarJugador
}