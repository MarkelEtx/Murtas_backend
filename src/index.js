import { env } from "./config/env.js"; // lo primero: carga y valida el .env (si falta algo, no arranca)
import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";
import connection from "./config/db.js";
import connectDB from "./config/db_mongo.js";
// import { swaggerUi, swaggerSpec } from "./config/swagger.js";
// import { notFound, errorHandler } from "./middlewares/error.middleware.js";

const PORT = 3000;

const app = express();

// Middlewares 
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }))
app.use(express.json()) // permite leer el body de los POST en json
app.use(cookieParser()); // rellena req.cookies

app.use("/", router);

// Documentación interactiva de la API: http://localhost:3000/docs
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Siempre después de las rutas, y en este orden:
// app.use(notFound); // ninguna ruta ha respondido → 404
// app.use(errorHandler); // el último: recibe todos los errores

async function startServer(params) {
    const maxAttempts = 5;
    let attempts = maxAttempts;
    while (attempts) {
        try {
            await connection.authenticate();
            await connectDB();
            console.log("Conexión establecida con la base de datos");
            app.listen(PORT, () => {
                console.log("Aplicación en marcha")
            });
            break;
        } catch (error) {
            console.error(`Intento ${maxAttempts - attempts} No se ha podido conectar a la base de datos`, error);
        }
        attempts--;
        await new Promise((resolve, reject) => setTimeout(() => { resolve() }, 5000));
    }
    if (attempts === 0) {
        console.error(`no se ha podido conectar a la base de datos en ${maxAttempts} intentos`);
        process.exit(1);
    }
}

startServer();


