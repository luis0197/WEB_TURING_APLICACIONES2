import { Router } from "express";
import csvDataController from "../controller/csvData.controller.js";

const router = Router();

router.get("/", csvDataController.obtenerTodosLosDatosCsv);
router.post("/", csvDataController.ingresarCsvData);

export default router;
