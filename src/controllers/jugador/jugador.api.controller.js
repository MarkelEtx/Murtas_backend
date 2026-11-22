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
                mensaje: "Jugador no encontrado"
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
            mensaje: "Error al obtener las multas del jugador"
        });

    }
}

export default {
    listarJugadores,
    listarMultasJugador
}