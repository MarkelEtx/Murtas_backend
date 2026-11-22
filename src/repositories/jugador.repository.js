import Jugador from "../models/jugador.model.js"

const listarJugadores = async () => {
    return await Jugador.findAll({
        order: [["id", "ASC"]]
    });
};

export default {
    listarJugadores
}