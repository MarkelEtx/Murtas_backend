
import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const MultasJugador = connection.define('MultasJugador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idJugador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'jugador',
                schema: 'public'
            },
            key: 'id'
        }
    },
    idTipoMulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_tipomulta',//àra que squalize NO lo interprete como id_tipo_multas
        references: {
            model: {
                tableName: 'tipos_multas',
                schema: 'public'
            },
            key: 'id'
        }
    },
    idTemporada: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'temporada',
                schema: 'public'
            },
            key: 'id'
        }
    },
    importe: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fechaMulta: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    pagada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'multas_jugador',
    schema: 'public',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});

export default MultasJugador;