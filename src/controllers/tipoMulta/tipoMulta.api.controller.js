import tipoMultaRepository from "../../repositories/tipoMulta.repository.js"

// LISTAR TIPOS DE MULTAS
const listarTiposMultas = async (req, res) => {
    try {
        const tiposMultas = await tipoMultaRepository.listarTiposMultas();

        return res.status(200).json({
            ok: true,
            data: tiposMultas
        });

    } catch (error) {
        console.error("Error al listar tipos de multas:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener los tipos de multas"
        });
    }
};

// BUSCAR MULTA POR ID
const buscarTipoMultaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID de tipo de multa no válido"
            });
        }

        const tipoMulta = await tipoMultaRepository.buscarTipoMultaPorId(id);

        if (!tipoMulta) {
            return res.status(404).json({
                ok: false,
                mensaje: "Tipo de multa no encontrada"
            });
        }

        return res.status(200).json({
            ok: true,
            data: tipoMulta
        });

    } catch (error) {
        console.error("Error al buscar el tipo de multa:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener el tipo de multa"
        });
    }
};

// CREAR TIPO DE MULTA
const crearTipoMulta = async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            importeBase
        } = req.body;

        // VALIDAR NOMBRE
        if (
            !nombre ||
            typeof nombre !== "string" ||
            !nombre.trim()
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: "El nombre del tipo de multa es obligatorio"
            });
        }

        // VALIDAR VALOR
        if (
            importeBase === undefined ||
            importeBase === null ||
            importeBase === "" ||
            !Number.isFinite(Number(importeBase)) ||
            Number(importeBase) < 0
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: "El importe de la multa debe ser un número válido y no negativo"
            });
        }

        const tipoMulta = await tipoMultaRepository.crearTipoMulta({
            nombre: nombre,
            descripcion,
            importeBase: Number(importeBase)
        });

        return res.status(201).json({
            ok: true,
            mensaje: "Tipo de multa creado correctamente",
            data: tipoMulta
        });

    } catch (error) {
        console.error("Error al crear tipo de multa:", error);

        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                ok: false,
                mensaje: "Los datos del tipo de multa no son válidos"
            });
        }

        return res.status(500).json({
            ok: false,
            mensaje: "Error al crear el tipo de multa"
        });
    }
};


// MODIFICAR TIPO DE MULTA
const modificarTipoMulta = async (req, res) => {
    try {
        const { id } = req.params;

        // VALIDAR ID
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID de tipo de multa no válido"
            });
        }

        const tipoMulta = await tipoMultaRepository.modificarTipoMulta(
            id,
            req.body
        );

        if (!tipoMulta) {
            return res.status(404).json({
                ok: false,
                mensaje: "Tipo de multa no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            mensaje: "Tipo de multa modificada correctamente",
            data: tipoMulta
        });

    } catch (error) {
        console.error("Error al modificar tipo de multa:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al modificar el tipo de multa"
        });
    }
};

// ANULAR TIPO DE MULTA
const anularTipoMulta = async (req, res) => {
    try {
        const { id } = req.params;

        // VALIDAR ID
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID de tipo de multa no válido"
            });
        }

        const tipoMulta = await tipoMultaRepository.anularTipoMulta(id);

        if (!tipoMulta) {
            return res.status(404).json({
                ok: false,
                mensaje: "Tipo de multa no encontrada"
            });
        }

        return res.status(200).json({
            ok: true,
            mensaje: "Tipo de multa anulada correctamente",
            data: tipoMulta
        });

    } catch (error) {
        console.error("Error al anular tipo de multa:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al anular el tipo de multa"
        });
    }
};

export default {
    listarTiposMultas,
    buscarTipoMultaPorId,
    crearTipoMulta,
    modificarTipoMulta,
    anularTipoMulta
}