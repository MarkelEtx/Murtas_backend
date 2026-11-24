import Persona from "./persona.model.js";
import Jugador from "./jugador.model.js";
import Temporada from "./temporada.model.js";
import TiposMultas from "./tipoMultas.model.js";
import MultasJugador from "./multasJugador.model.js";
import HistorialModel from "./historial.model.js";

// =====================================
// RELACIÓN PERSONA - JUGADOR (1:1)
// =====================================

Persona.hasOne(Jugador, {
    foreignKey: "idPersona",
    as: "jugador"
});

Jugador.belongsTo(Persona, {
    foreignKey: "idPersona",
    as: "persona"
});

// =====================================
// RELACIÓN JUGADOR - MULTAS (1:N)
// =====================================

Jugador.hasMany(MultasJugador, {
    foreignKey: "idJugador",
    as: "multas"
});

MultasJugador.belongsTo(Jugador, {
    foreignKey: "idJugador",
    as: "jugador"
});

// =====================================
// RELACIÓN TIPOS_MULTAS - MULTAS (1:N)
// =====================================

TiposMultas.hasMany(MultasJugador, {
    foreignKey: "idTipoMulta",
    as: "multas"
});

MultasJugador.belongsTo(TiposMultas, {
    foreignKey: "idTipoMulta",
    as: "tipoMulta"
});

// =====================================
// RELACIÓN TEMPORADA - MULTAS (1:N)
// =====================================

Temporada.hasMany(MultasJugador, {
    foreignKey: "idTemporada",
    as: "multas"
});

MultasJugador.belongsTo(Temporada, {
    foreignKey: "idTemporada",
    as: "temporada"
});


export {
    Persona,
    Jugador,
    Temporada,
    TiposMultas,
    MultasJugador,
    HistorialModel
};