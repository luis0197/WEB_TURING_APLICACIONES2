import auditoriaService from "../services/auditoria.service.js";

const obtenerTodasLasAuditorias = async (req, res) => {
  try {
    const auditorias = await auditoriaService.obtenerTodasLasAuditorias();
    return res.status(200).json({
      status: true,
      body: auditorias,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      error: error.message,
      errorStack: "" + error.originalError,
    });
  }
};

export default { obtenerTodasLasAuditorias };
