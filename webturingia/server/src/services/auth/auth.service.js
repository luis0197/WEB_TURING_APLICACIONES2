import bcrypt from "bcryptjs";
import { generartoken } from "../../utils/index.utils.js";
import usuariosRepositories from "../../repositories/usuarios.repositories.js";
import { CustomError } from "../../errors/index.error.js";

const login = async (parametro) => {
  try {
    const { username, password } = parametro;
    const usuario = await usuariosRepositories.obtenerUsuarioUsername(username);

    if (!usuario) throw Error("Usuario no encontrado");

    if (!bcrypt.compareSync(password, usuario.password))
      throw Error("Crendeciales incorrectas");

    const token = await generartoken({
      usuarioID: usuario.usuarioID,
      rol: usuario.rol,
    });

    delete usuario.password;
    usuario.token = token;

    return usuario;
  } catch (error) {
    let statusCode = 500;
    if (error.message === "Usuario no encontrado") statusCode = 404;
    if (error.message === "Crendeciales incorrectas") statusCode = 400;
    throw new CustomError("Error servicio login", statusCode, error);
  }
};

export default { login };
