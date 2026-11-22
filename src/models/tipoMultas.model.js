
import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const TiposMultas = connection.define('TiposMultas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    importeBase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    tableName: 'tipos_multas',
    schema: 'public',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});

export default TiposMultas;