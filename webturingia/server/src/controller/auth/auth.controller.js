import authService from "../../services/auth/auth.service.js";
import { auditoriaAccion } from "../../modelos/auditoria.model.js";
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await authService.login({ username, password });
    return res.status(200).json({
      status: true,
      body: usuario,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      error: error.message,
      errorStack: "" + error.originalError,
    });
  }
};

export default { login };
