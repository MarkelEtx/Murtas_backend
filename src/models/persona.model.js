
import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Persona = connection.define('Persona', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(254),
        allowNull: true
    },
    contrasena: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'persona',
    schema: 'public',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});

export default Persona;