
import Persona from "../models/persona.model.js";

// BUSCAR PERSONA POR EMAIL
const buscarPorEmail = async (email) => {
    return await Persona.findOne({
        where: { email }
    });
};

// BUSCAR PERSONA POR ID
const buscarPorId = async (id) => {
    return await Persona.findByPk(id, {
        attributes: ['id', 'nombre', 'email']
    });
};

// CREAR PERSONA
const crear = async (datos) => {
    return await Persona.create(datos);
};

export default {
    buscarPorEmail,
    buscarPorId,
    crear
};