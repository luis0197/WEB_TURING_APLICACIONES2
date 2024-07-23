import auditoriaRepositorie from "../repositories/auditoria.repositorie.js";

const obtenerTodasLasAuditorias = async (req, res) => {
  try {
    const auditorias = await auditoriaRepositorie.obtenerTodasLasAuditorias();
    return auditorias;
  } catch (error) {
    throw new CustomError(
      "Error servicio  al obtener las auditorias",
      500,
      error
    );
  }
};

export default { obtenerTodasLasAuditorias };
