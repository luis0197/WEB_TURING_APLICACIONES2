import { User } from "../modelos/usersmodel.js";

const obtenerTodosLosUsuario = async () => {
  try {
    const usuarios = await User.findAll();
    return usuarios.map((usuario) => {
      return {
        usuarioID: usuario.usuarioID,
        nombreResponsable: usuario.nombreResponsable,
        institucion: usuario.institucion,
        username: usuario.username,
        rol: usuario.rol,
        estado: usuario.estado,
        cedula: usuario.cedula,
      };
    });
  } catch (error) {
    throw error;
  }
};

const crearUsuario = async (parametro) => {
  try {
    const usuarioCreado = await User.create(parametro);
    return {
      usuarioID: usuarioCreado.usuarioID,
      nombreResponsable: usuarioCreado.nombreResponsable,
      institucion: usuarioCreado.institucion,
      username: usuarioCreado.username,
      rol: usuarioCreado.rol,
      estado: usuarioCreado.estado,
      cedula: usuarioCreado.cedula,
    };
  } catch (error) {
    throw error;
  }
};

const obtenerUsuarioInstitucion = async (parametro) => {
  try {
    const usuario = await User.findOne({
      where: {
        institucion: parametro,
      },
    });
    if (!usuario) throw Error("Usuario no encontrado");
    return {
      usuarioID: usuarioCreado.usuarioID,
      nombreResponsable: usuarioCreado.nombreResponsable,
      institucion: usuarioCreado.institucion,
      username: usuarioCreado.username,
      rol: usuarioCreado.rol,
      estado: usuarioCreado.estado,
      cedula: usuarioCreado.cedula,
    };
  } catch (error) {
    throw error;
  }
};

const obtenerUsuarioUsername = async (parametro) => {
  try {
    const usuario = await User.findOne({
      where: {
        username: parametro,
      },
    });
    if (!usuario) throw Error("Usuario no encontrado");
    return {
      usuarioID: usuario.usuarioID,
      nombreResponsable: usuario.nombreResponsable,
      institucion: usuario.institucion,
      username: usuario.username,
      password: usuario.password,
      rol: usuario.rol,
      estado: usuario.estado,
      cedula: usuario.cedula,
    };
  } catch (error) {
    throw error;
  }
};

const obtenerUsuarioPorID = async (parametro) => {
  try {
    const usuario = await User.findOne({
      where: {
        cedula: parametro,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!usuario) throw Error("Usuario no encontrado");
    return {
      usuarioID: usuario.usuarioID,
      nombreResponsable: usuario.nombreResponsable,
      institucion: usuario.institucion,
      username: usuario.username,
      rol: usuario.rol,
      estado: usuario.estado,
      cedula: usuario.cedula,
    };
  } catch (error) {
    throw error;
  }
};

const actualizarUsuario = async (parametro) => {
  try {
    const usuarioActualizado = await User.update(parametro, {
      where: {
        usuarioID: parametro.usuarioID,
      },
    });
    if (usuarioActualizado[0] === 0) throw Error("Usuario no encontrado");
    return "Usuario actualizado correctamente";
  } catch (error) {
    throw error;
  }
};

const eliminarUsuario = async (usuarioID) => {
  try {
    const usuarioEliminado = await User.destroy({
      where: {
        usuarioID: usuarioID,
      },
    });
    if (usuarioEliminado === 0) throw new Error("Usuario no encontrado");
    return "Usuario eliminado correctamente";
  } catch (error) {
    throw error;
  }
};

export default {
  obtenerTodosLosUsuario,
  obtenerUsuarioUsername,
  obtenerUsuarioInstitucion,
  obtenerUsuarioPorID,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
