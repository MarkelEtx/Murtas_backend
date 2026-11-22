import { Jugador, MultasJugador } from "../models/index.js"

const listarJugadores = async () => {
    return await Jugador.findAll({
        order: [["id", "ASC"]]
    });
};

const listarMultasJugador = async (id) => {
    const jugador = await Jugador.findByPk(id);
    if (!jugador) return null;

    return await MultasJugador.findAll({
        where: {
            id_jugador: id
        },
        order: [["id", "DESC"]]
    });
}

// BUSCAR JUGADOR POR ID
const buscarJugadorPorId = async (id) => {
    return await Jugador.findByPk(id);
};

export default {
    listarJugadores,
    listarMultasJugador,
    buscarJugadorPorId

}