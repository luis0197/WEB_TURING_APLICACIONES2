import { Router } from "express";
import auditoriaController from "../controller/auditoria.controller.js";

const router = Router();

router.get("/", auditoriaController.obtenerTodasLasAuditorias);

export default router;
