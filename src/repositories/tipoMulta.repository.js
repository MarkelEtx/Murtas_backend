import { TiposMultas } from "../models/index.js"


// LISTAR TIPOS DE MULTAS
const listarTiposMultas = async () => {
    return await TiposMultas.findAll({
        order: [["id", "ASC"]]
    });
};

// VER TIPO DE MULTA
const buscarTipoMultaPorId = async (id) => {
    return await TiposMultas.findByPk(id);
};

// CREAR TIPO DE MULTA
const crearTipoMulta = async (datos) => {
    return await TiposMultas.create({
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        importeBase: datos.importeBase,
    });
};

// MODIFICAR TIPO DE MULTA
const modificarTipoMulta = async (id, datos) => {
    const tipoMulta = await TiposMultas.findByPk(id);

    if (!tipoMulta) return null;

    const camposPermitidos = [
        "nombre",
        "descripcion",
        "importeBase"
    ];

    const datosActualizados = {};

    camposPermitidos.forEach(campo => {
        if (datos[campo] !== undefined) {
            datosActualizados[campo] = datos[campo];
        }
    });

    await tipoMulta.update(datosActualizados);

    return tipoMulta;
};

// ANULAR TIPO DE MULTA
const anularTipoMulta = async (id) => {
    const tipoMulta = await TiposMultas.findByPk(id);

    if (!tipoMulta) return null;

    return await tipoMulta.update({
        activa: false
    });
};

export default {
    listarTiposMultas,
    buscarTipoMultaPorId,
    crearTipoMulta,
    modificarTipoMulta,
    anularTipoMulta
}