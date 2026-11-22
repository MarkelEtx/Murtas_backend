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

export default {
    listarJugadores,
    listarMultasJugador
}