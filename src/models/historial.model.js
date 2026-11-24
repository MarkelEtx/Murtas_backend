import { Schema, model } from "mongoose";
import { ACCIONES_HISTORIAL } from "../config/constants.js";

const historialSchema = new Schema(
  {
    accion: {
      type: String,
      required: [true, "La acción es obligatoria"],
      enum: ACCIONES_HISTORIAL,
    },

    usuario: {
      type: String,
      required: [true, "El usuario es obligatorio"],
      trim: true,
    },

    usuarioAfectado: {
      type: String,
      required: [true, "El usuario es obligatorio"],
      alias: "usuario_afectado",
      trim: true,
    },

    entidad: {
      type: String,
      trim: true,
      uppercase: true,
    },

    idEntidad: {
      type: String,
      alias: "id_entidad",
      trim: true,
    },

    resumen: {
      type: String,
      required: [true, "El resumen es obligatorio"],
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "historial",
    toJSON: {
      transform: (_doc, ret) => {
        const { __v, ...historial } = ret;
        return historial;
      },
    },
  },
);

const HistorialModel = model("Historial", historialSchema);
export default HistorialModel;