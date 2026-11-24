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

    entidad: {
      type: String,
      trim: true,
      uppercase: true,
    },

    id_entidad: {
      type: String,
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
  },
);

export const HistorialModel = model("Historial", historialSchema);