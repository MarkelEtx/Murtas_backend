import multaRepository from "../../repositories/multa.repository.js"

// LISTAR MULTAS
const listarMultas = async (req, res) => {
    try {
        const multas = await multaRepository.listarMultas();

        return res.status(200).json({
            ok: true,
            data: multas
        });

    } catch (error) {
        console.error("Error al listar multas:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener las multas"
        });
    }
};

// BUSCAR MULTA POR ID
const buscarMultaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID de multa no válido"
            });
        }

        const multa = await multaRepository.buscarMultaPorId(id);

        if (!multa) {
            return res.status(404).json({
                ok: false,
                mensaje: "Multa no encontrada"
            });
        }

        return res.status(200).json({
            ok: true,
            data: multa
        });

    } catch (error) {
        console.error("Error al buscar multa:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener la multa"
        });
    }
};


// CREAR MULTA
const crearMulta = async (req, res) => {
    try {
        const {
            id_jugador,
            id_tipo_multa,
            id_temporada,
            fecha,
            valor,
            observacion
        } = req.body;

        // VALIDAR IDS
        if (
            !Number.isInteger(Number(id_jugador)) ||
            Number(id_jugador) <= 0 ||
            !Number.isInteger(Number(id_tipo_multa)) ||
            Number(id_tipo_multa) <= 0
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: "El jugador y el tipo de multa son obligatorios y deben ser válidos"
            });
        }

        // VALIDAR VALOR
        if (
            valor === undefined ||
            valor === null ||
            valor === "" ||
            !Number.isFinite(Number(valor)) ||
            Number(valor) < 0
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: "El valor de la multa debe ser un número válido y no negativo"
            });
        }

        const multa = await multaRepository.crearMulta({
            id_jugador,
            id_tipo_multa,
            id_temporada,
            fecha,
            importe,
            observacion
        });

        if (!multa) {
            return res.status(404).json({
                ok: false,
                mensaje: "Tipo de multa no encontrado"
            });
        }

        return res.status(201).json({
            ok: true,
            mensaje: "Multa asignada correctamente",
            data: multa
        });

    } catch (error) {
        console.error("Error al crear multa:", error);

        if (
            error.name === "SequelizeValidationError" ||
            error.name === "SequelizeForeignKeyConstraintError"
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: "Los datos de la multa no son válidos"
            });
        }

        return res.status(500).json({
            ok: false,
            mensaje: "Error al asignar la multa"
        });
    }
};

// MODIFICAR MULTA
const modificarMulta = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID de multa no válido"
            });
        }

        const multa = await multaRepository.modificarMulta(
            id,
            req.body
        );

        if (!multa) {
            return res.status(404).json({
                ok: false,
                mensaje: "Multa no encontrada"
            });
        }

        return res.status(200).json({
            ok: true,
            mensaje: "Multa modificada correctamente",
            data: multa
        });

    } catch (error) {
        console.error("Error al modificar multa:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al modificar la multa"
        });
    }
};


// PAGAR MULTA
const pagarMulta = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID de multa no válido"
            });
        }

        const multa = await multaRepository.pagarMulta(id);

        if (!multa) {
            return res.status(404).json({
                ok: false,
                mensaje: "Multa no encontrada"
            });
        }

        if (!multa.activa) {
            return res.status(409).json({
                ok: false,
                mensaje: "No se puede pagar una multa anulada"
            });
        }
        
        if (multa.pagada) {
            return res.status(409).json({
                ok: false,
                mensaje: "No se puede pagar una multa ya pagada"
            });
        }

        return res.status(200).json({
            ok: true,
            mensaje: "Pago registrado correctamente",
            data: multa
        });

    } catch (error) {
        console.error("Error al pagar multa:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al registrar el pago"
        });
    }
};

// ANULAR MULTA
const anularMulta = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID de multa no válido"
            });
        }

        const multa = await multaRepository.buscarMultaPorId(id);

        if (!multa) {
            return res.status(404).json({
                ok: false,
                mensaje: "Multa no encontrada"
            });
        }

        if (multa.pagada) {
            return res.status(409).json({
                ok: false,
                mensaje: "No se puede anular una multa que ya está pagada"
            });
        }
        
        if (!multa.activa) {
            return res.status(409).json({
                ok: false,
                mensaje: "No se puede anular una multa anulada"
            });
        }

        const multaAnulada = await multaRepository.anularMulta(id);

        return res.status(200).json({
            ok: true,
            mensaje: "Multa anulada correctamente",
            data: multaAnulada
        });

    } catch (error) {
        console.error("Error al anular multa:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al anular la multa"
        });
    }
};

export default {
    listarMultas,
    buscarMultaPorId,
    crearMulta,
    modificarMulta,
    pagarMulta,
    anularMulta
}