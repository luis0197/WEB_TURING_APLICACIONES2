import usuariosService from "../services/usuarios.service.js";
import { auditoriaAccion } from "../modelos/auditoria.model.js";
import dayjs from "dayjs";

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosService.obtenerTodosLosUsuarios();
    await auditoriaAccion.create({
      usuarioID: req.usuario.usuarioID,
      dt_fecha: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      str_ip_host: req.ip,
      str_nombre_tabla: "tb_usuarios",
      str_accion: "consultar",
      txt_descripcion: "Se consultaron los usuarios",
      txt_valor: JSON.stringify(req.body),
    });

    return res.status(200).json({
      status: true,
      body: usuarios,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      error: error.message,
      errorStack: "" + error.originalError,
    });
  }
};

const obtenerUsuarioInstitucion = async (req, res) => {
  try {
    const usuario = await usuariosService.obtenerUsuarioInstitucion(
      req.params.email
    );
    await auditoriaAccion.create({
      usuarioID: req.usuario.usuarioID,
      str_nombre_tabla: "tb_usuarios",
      dt_fecha: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      str_accion: "consultar",
      str_ip_host: req.ip,
      txt_valor: JSON.stringify(req.params.email),
      txt_descripcion: "Se consultó un usuario por institución",
    });
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

const obtenerUsuarioID = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuariosService.obtenerUsuarioID(id);

    await auditoriaAccion.create({
      usuarioID: req.usuario.usuarioID,
      str_nombre_tabla: "tb_usuarios",
      dt_fecha: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      str_accion: "consultar",
      str_ip_host: req.ip,
      txt_valor: JSON.stringify(req.params.id),
      txt_descripcion: "Se consultó un usuario por ID",
    });

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

const crearUsuario = async (req, res) => {
  try {
    const usuario = await usuariosService.crearUsuario(req.body);
    await auditoriaAccion.create({
      usuarioID: req.usuario.usuarioID,
      str_nombre_tabla: "tb_usuarios",
      dt_fecha: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      str_accion: "insertar",
      str_ip_host: req.ip,
      txt_valor: JSON.stringify(req.body),
      txt_descripcion: "Se creó un usuario",
    });

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

const actualizarUsuario = async (req, res) => {
  try {
    const { body } = req;
    const usuario = await usuariosService.obtenerUsuarioID(req.params.id);
    body.usuarioID = usuario.usuarioID;
    const usuarioActualizado = await usuariosService.actualizarUsuario(body);

    await auditoriaAccion.create({
      usuarioID: req.usuario.usuarioID,
      str_nombre_tabla: "tb_usuarios",
      dt_fecha: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      str_accion: "actualizar",
      str_ip_host: req.ip,
      txt_valor: JSON.stringify(req.body),
      txt_descripcion: "Se actualizó un usuario",
    });

    return res.status(200).json({
      status: true,
      body: usuarioActualizado,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      error: error.message,
      errorStack: "" + error.originalError,
    });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await usuariosService.eliminarUsuario(req.params.id);
    await auditoriaAccion.create({
      usuarioID: req.usuario.usuarioID,
      str_nombre_tabla: "tb_usuarios",
      dt_fecha: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      str_accion: "eliminar",
      str_ip_host: req.ip,
      txt_valor: JSON.stringify(req.params.id),
      txt_descripcion: "Se eliminó un usuario",
    });
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

export default {
  obtenerUsuarios,
  obtenerUsuarioInstitucion,
  obtenerUsuarioID,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
