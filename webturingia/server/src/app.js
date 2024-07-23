import express from "express";
import { createServer } from "http";
import indexRoute from "./route/index.routes.js";
import { inyeccionMiddleware } from "./middleware/inyeccion.middleware.js";
import { ConfigVariables } from "./config/variablesconfigsequelize.js";
import cors from 'cors';
const app = express();
const httpServer = createServer(app);

app.use(cors())
app.set("port", ConfigVariables.port || 3000);

// Inyeccion de middleware
inyeccionMiddleware(app, express);

// Inicia el servidor
app.use("/api", indexRoute);
export { app, httpServer };
