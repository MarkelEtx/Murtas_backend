import "dotenv/config"; // carga el .env en process.env (no pisa las variables que ya existan)

/**
 * Todas las variables de entorno que usa la API, ya validadas.
 *
 * @typedef {Object} Env
 * @property {string} NODE_ENV - "development", "production" o "test"
 * @property {number} APP_PORT - Puerto publicado en tu ordenador
 * @property {string} FRONTEND_URL - Dirección del frontend (para CORS y cookies)
 * @property {string} JWT_SECRET - Secreto para firmar los tokens
 *
 * Mongo
 * @property {string} MONGO_HOST
 * @property {number} MONGO_PORT
 * @property {string} MONGO_USER
 * @property {string} MONGO_PASSWORD
 * @property {string} MONGO_DB
 * @property {string} MONGO_AUTH_SOURCE
 * 
 * PostgreSQL
 * @property {string} POSTGRES_HOST
 * @property {number} POSTGRES_PORT
 * @property {string} POSTGRES_USER
 * @property {string} POSTGRES_PASSWORD
 * @property {string} POSTGRES_DB
 */

const REQUIRED = [
  "JWT_SECRET",
  //mongoDB
  "MONGO_HOST",
  "MONGO_PORT",
  "MONGO_USER",
  "MONGO_PASSWORD",
  "MONGO_DB",
  // PostgreSQL
  "POSTGRES_HOST",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
];

/**
 * Lee las variables de entorno y comprueba que están las obligatorias.
 *
 * Se ejecuta UNA vez, al importar este archivo. Si falta alguna variable obligatoria,
 * la aplicación no arranca y dice cuál falta (mejor que fallar más tarde con un error raro).
 *
 * @returns {Env} Las variables validadas
 * @throws {Error} Si falta alguna variable obligatoria
 */
const getEnv = () => {
  const missing = REQUIRED.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno: ${missing.join(", ")}. Revisa tu .env (mira .env.example)`);
  }

  return {
    NODE_ENV: process.env.NODE_ENV || "development",
    APP_PORT: Number(process.env.APP_PORT) || 3000,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    JWT_SECRET: process.env.JWT_SECRET,

    //Mongo
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: Number(process.env.MONGO_PORT),
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_AUTH_SOURCE: process.env.MONGO_AUTH_SOURCE || "admin",

      // PostgreSQL
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 5432,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
  };
};

/** @type {Env} */
export const env = getEnv();