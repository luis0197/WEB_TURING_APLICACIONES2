import jwt from "jsonwebtoken";
import { ConfigVariables } from "../config/variablesconfigsequelize.js";

export const generartoken = async (usuario) => {
  try {
    const token = await jwt.sign(
      {
        usuarioID: usuario.usuarioID,
        rol: usuario.rol,
      },
      ConfigVariables.jwtSecret,
      {
        expiresIn: "24h",
      }
    );
    return token;
  } catch (error) {
    return error;
  }
};

export const verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, ConfigVariables.jwtSecret);
    return [true, decoded];
  } catch (error) {
    return [false, error];
  }
};

export const verificarRol = (roles) => {
  return (req, res, next) => {
    const { rol } = req.usuario;
    if (roles.includes(rol)) {
      next();
    } else {
      return res.status(401).json({
        status: false,
        error: "No tienes permisos para realizar esta acción",
      });
    }
  };
};

export default { generartoken, verificarToken, verificarRol };
