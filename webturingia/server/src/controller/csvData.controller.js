import csvDataService from "../services/csvData.service.js";
import { auditoriaAccion } from "../modelos/auditoria.model.js";
import dayjs from "dayjs";
const ingresarCsvData = async (req, res) => {
  try {
    await csvDataService.ingresarCsvData(req.body);
    await auditoriaAccion.create({
      usuarioID: req.usuario.usuarioID,
      dt_fecha: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      str_ip_host: req.ip,
      str_nombre_tabla: "tb_csvData",
      str_accion: "registrar",
      txt_descripcion: "Se registraron los datos del csv",
      txt_valor: JSON.stringify(req.body),
    });
   
    return res.status(200).json({
      status: true,
      body: "Datos ingresados correctamente",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      error: error.message,
      errorStack: "" + error.originalError,
    });
  }
};

const obtenerTodosLosDatosCsv = async (req, res) => {
  try {
    const datosCsv = await csvDataService.obtenerTodosLosDatosCsv();
    await auditoriaAccion.create({
      usuarioID: req.usuario.usuarioID,
      dt_fecha: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      str_ip_host: req.ip,
      str_nombre_tabla: "tb_csvData",
      str_accion: "consultar",
      txt_descripcion: "Se consultaron los datos del csv",
      txt_valor: JSON.stringify(req.body),
    });
    return res.status(200).json({
      status: true,
      body: datosCsv,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      error: error.message,
      errorStack: "" + error.originalError,
    });
  }
};

export default { ingresarCsvData, obtenerTodosLosDatosCsv };
