import historialRepository from "../../repositories/historial.repository.js";
import mongoose from "mongoose";

// LISTAR JUGADORES
const listarHistorial = async (req, res) => {
    try {
        const historial = await historialRepository.listarHistorial();

        return res.status(200).json({
            ok: true,
            data: historial
        });

    } catch (error) {
        console.error("Error al listar historial:", error);

        return res.status(500).json({
            ok: false,
            message: "Error al obtener los historial"
        });
    }
};

const buscarHistorialPorId = async (req, res) => {
    try {
        const { id } = req.params;

        // VALIDAR ID DE MONGODB
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                ok: false,
                message: "ID de registro de historial no válido"
            });
        }

        
        const registro = await historialRepository.buscarhistorialPorId(id);

        if (!registro) {
            return res.status(404).json({
                ok: false,
                message: "Registro de historial no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            data: registro
        });

    } catch (error) {
        console.error("Error al buscar registro de historial:", error);

        return res.status(500).json({
            ok: false,
            message: "Error al obtener el registro de historial"
        });
    }
}

export default {
    listarHistorial,
    buscarHistorialPorId
}