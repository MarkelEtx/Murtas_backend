import Persona from "./persona.model.js";
import Jugador from "./jugador.model.js";
import Temporada from "./temporada.model.js";
import TiposMultas from "./tipoMultas.model.js";
import MultasJugador from "./multasJugador.model.js";

// =====================================
// RELACIÓN PERSONA - JUGADOR (1:1)
// =====================================

Persona.hasOne(Jugador, {
    foreignKey: "id_persona",
    as: "jugador"
});

Jugador.belongsTo(Persona, {
    foreignKey: "id_persona",
    as: "persona"
});

// =====================================
// RELACIÓN JUGADOR - MULTAS (1:N)
// =====================================

Jugador.hasMany(MultasJugador, {
    foreignKey: "id_jugador",
    as: "multas"
});

MultasJugador.belongsTo(Jugador, {
    foreignKey: "id_jugador",
    as: "jugador"
});

// =====================================
// RELACIÓN TIPOS_MULTAS - MULTAS (1:N)
// =====================================

TiposMultas.hasMany(MultasJugador, {
    foreignKey: "id_tipomulta",
    as: "multas"
});

MultasJugador.belongsTo(TiposMultas, {
    foreignKey: "id_tipomulta",
    as: "tipoMulta"
});

// =====================================
// RELACIÓN TEMPORADA - MULTAS (1:N)
// =====================================

Temporada.hasMany(MultasJugador, {
    foreignKey: "id_temporada",
    as: "multas"
});

MultasJugador.belongsTo(Temporada, {
    foreignKey: "id_temporada",
    as: "temporada"
});


export {
    Persona,
    Jugador,
    Temporada,
    TiposMultas,
    MultasJugador
};