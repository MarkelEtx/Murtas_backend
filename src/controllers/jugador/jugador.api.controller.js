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

export default {
    listarJugadores
}