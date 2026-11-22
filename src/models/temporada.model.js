import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Temporada = connection.define('Temporada', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(9),
        allowNull: false
    },
    fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    fechaFin: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    tableName: 'temporada',
    schema: 'public',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});

export default Temporada;