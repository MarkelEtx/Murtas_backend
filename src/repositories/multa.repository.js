import { MultasJugador, TiposMultas, Jugador } from "../models/index.js"

// LISTAR TODAS LAS MULTAS
const listarMultas = async () => {
    return await MultasJugador.findAll({
        include: [{
            model: TiposMultas,
            as: "tipoMulta",
            attributes: ["nombre", "descripcion"]
        }],
        order: [["id", "ASC"]]
    });
};

// BUSCAR JUGADOR POR ID
const buscarMultaPorId = async (id) => {
    return await MultasJugador.findByPk(id, {
        include: [{
            model: TiposMultas,
            as: "tipoMulta",
            attributes: ["nombre", "descripcion"]
        }],
    });
};

// CREAR MULTA
const crearMulta = async (datos) => {
    return await MultasJugador.create({
        idJugador: datos.idJugador,
        idTipoMulta: datos.idTipoMulta,
        idTemporada: datos.idTemporada,
        fechaMulta: datos.fechaMulta,
        importe: datos.importe,
        observaciones: datos.observacion,
        pagada: false,
        activa: true
    });
};


// MODIFICAR MULTA
const modificarMulta = async (id, datos) => {
    const multa = await MultasJugador.findByPk(id);

    if (!multa) return null;

    const camposPermitidos = [
        "idJugador",
        "idTipoMulta",
        "idTemporada",
        "fechaMulta",
        "importe",
        "observaciones"
    ];

    const datosActualizados = {};

    camposPermitidos.forEach(campo => {
        if (datos[campo] !== undefined) {
            datosActualizados[campo] = datos[campo];
        }
    });

    await multa.update(datosActualizados);

    return multa;
};

// REGISTRAR PAGO DE MULTA
const pagarMulta = async (id) => {
    const multa = await MultasJugador.findByPk(id, {
        include: [
            {
                model: Jugador,
                as: "jugador",
                attributes: ["nombre"]
            }
        ]
    });

    if (!multa) return null;

    await multa.update({
        pagada: true
    });

    return multa;
};

// ANULAR MULTA
const anularMulta = async (id) => {
    const multa = await MultasJugador.findByPk(id);

    if (!multa) return null;

    await multa.update({
        activa: false
    });

    return multa;
};

// OBTENER MULTAS CON FILTROS
const obtenerMultasFiltradas = async (filtros = {}) => {

    const where = {
        activa: true
    };

    if (filtros.idTemporada !== undefined) {
        where.idTemporada = filtros.idTemporada;
    }

    if (filtros.idJugador !== undefined) {
        where.idJugador = filtros.idJugador;
    }

    return await MultasJugador.findAll({
        where: where
    });
}

export default {
    listarMultas,
    buscarMultaPorId,
    crearMulta,
    modificarMulta,
    pagarMulta,
    anularMulta,
    obtenerMultasFiltradas
}