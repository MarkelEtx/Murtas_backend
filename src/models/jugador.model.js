import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Jugador = connection.define('Jugador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idPersona: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        field: "id_persona",
        references: {
            model: {
                tableName: 'persona',
                schema: 'public'
            },
            key: 'id'
        }
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    capitan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    posicion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dorsal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaAlta: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    tableName: 'jugador',
    schema: 'public',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});

export default Jugador;