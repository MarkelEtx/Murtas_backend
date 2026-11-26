import { HistorialModel } from "../models/index.js";

// REGISTRAR ACCIÓN EN EL HISTORIAL
const registrarHistorial = async (datos) => {
    
    return await HistorialModel.create({
        accion: datos.accion,
        usuario: datos.usuario,
        usuarioAfectado: datos.usuarioAfectado,
        entidad: datos.entidad,
        id_entidad: datos.id_entidad,
        resumen: datos.resumen
    });
};

// LISTAR HISTORIAL
const listarHistorial = async () => {
    return await HistorialModel.find().sort({
        created_at: -1
    });
};

// BUSCAR POR ID
const buscarhistorialPorId = async (id) => {
  return await HistorialModel.findById(id);
};

export default{
    listarHistorial,
    registrarHistorial,
    buscarhistorialPorId
}