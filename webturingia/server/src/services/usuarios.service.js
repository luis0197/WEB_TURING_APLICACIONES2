import bcrypt from "bcryptjs";
import usuariosRepositories from "../repositories/usuarios.repositories.js";

import { CustomError } from "../errors/index.error.js";

const obtenerTodosLosUsuarios = async () => {
  try {
    const usuarios = await usuariosRepositories.obtenerTodosLosUsuario();
    return usuarios;
  } catch (error) {
    throw new CustomError(
      "Error servicio  al obtener los usuarios",
      500,
      error
    );
  }
};

const crearUsuario = async (parametro) => {
  try {
    const email = parametro.username;
    const password = parametro.password;
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regexEmail.test(email)) {
      throw Error("El correo ingresado no tiene el formato correcto");
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexPassword.test(password)) {
      throw Error(
        "El password debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero"
      );
    }

    let salt = bcrypt.genSaltSync();
    parametro.password = bcrypt.hashSync(parametro.password, salt);

    const usuarioCreado = await usuariosRepositories.crearUsuario(parametro);
    return usuarioCreado;
  } catch (error) {
    throw new CustomError("Error al crear usuario", 500, error);
  }
};

const obtenerUsuarioInstitucion = async (parametro) => {
  try {
    const usuario = await usuariosRepositories.obtenerUsuarioInstitucion(
      parametro
    );
    return usuario;
  } catch (error) {
    let statusCode = 500;
    if (error instanceof Error) statusCode = 404;
    throw new CustomError(
      "Error servicio obtener usuario por email",
      statusCode,
      error
    );
  }
};

const obtenerUsuarioID = async (parametro) => {
  try {
    const usuario = await usuariosRepositories.obtenerUsuarioPorID(parametro);
    return usuario;
  } catch (error) {
    let statusCode = 500;
    if (error instanceof Error) statusCode = 404;
    throw new CustomError(
      "Error servicio obtener usuario por id",
      statusCode,
      error
    );
  }
};

const actualizarUsuario = async (parametro, id) => {
  try {
    const usuario = await usuariosRepositories.actualizarUsuario(parametro);
    return usuario;
  } catch (error) {
    let statusCode = 500;
    if (error.message === "Usuario no encontrado") statusCode = 404;
    throw new CustomError(
      "Error servicio al actualizar el usuario",
      statusCode,
      error
    );
  }
};

const eliminarUsuario = async (parametro) => {
  try {
    const usuario = await usuariosRepositories.eliminarUsuario(parametro);
    return usuario;
  } catch (error) {
    let statusCode = 500;
    if (error.message === "Usuario no encontrado") statusCode = 404;
    throw new CustomError(
      "Error servicio al eliminar el usuario",
      statusCode,
      error
    );
  }
};

export default {
  obtenerTodosLosUsuarios,
  crearUsuario,
  obtenerUsuarioInstitucion,
  obtenerUsuarioID,
  actualizarUsuario,
  eliminarUsuario,
};
