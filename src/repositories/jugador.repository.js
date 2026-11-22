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

// CREAR JUGADOR
const crearJugador = async (datos) => {
    return await Jugador.create({
        id_persona: datos.id_persona || null,
        nombre: datos.nombre,
        capitan: datos.capitan ?? false,
        posicion: datos.posicion,
        dorsal: datos.dorsal,
        fecha_alta: datos.fecha_alta || null,
        activo: true
    });
};


// ACTIVAR / DESACTIVAR JUGADOR
const cambiarEstadoJugador = async (id, activo) => {
    const jugador = await Jugador.findByPk(id);

    if (!jugador) return null;

    await jugador.update({
        activo: activo
    });

    return jugador;
};

// MODIFICAR JUGADOR
const modificarJugador = async (id, datos) => {
    const jugador = await Jugador.findByPk(id);

    if (!jugador) return null;

    const camposPermitidos = [
        "id_persona",
        "nombre",
        "capitan",
        "posicion",
        "dorsal",
        "fecha_alta"
    ];

    const datosActualizados = {};

    camposPermitidos.forEach(campo => {//modificamos los campos permitidos en campospermitios
        if (datos[campo] !== undefined) {
            datosActualizados[campo] = datos[campo];
        }
    });

    await jugador.update(datosActualizados);

    return jugador;
};

export default {
    listarJugadores,
    listarMultasJugador,
    buscarJugadorPorId,
    crearJugador,
    cambiarEstadoJugador,
    modificarJugador

}