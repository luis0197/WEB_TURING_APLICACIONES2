import { auditoriaAccion } from "../modelos/auditoria.model.js";

const obtenerTodasLasAuditorias = async () => {
  try {
    const auditorias = await auditoriaAccion.findAll();
    return auditorias;
  } catch (error) {
    throw error;
  }
};

export default { obtenerTodasLasAuditorias };
