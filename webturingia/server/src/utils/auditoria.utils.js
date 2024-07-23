import { auditoriaAccion } from "../modelos/auditoria.model.js";

const dayjs = require("dayjs");

export async function ingresarAccionAuditoria(params, t) {
  try {
    const { accion, tabla, ip, idUsuario, descripcion, datos } = params;
    const diccAccion = {
      insertar: "Insertó",
      actualizar: "Actualizó",
      eliminar: "Actualizó el estado de",
    };
    await auditoriaAccion.create(
      {
        usuarioID: idUsuario,
        str_nombre_tabla: tabla,
        dt_fecha: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        str_accion: accion,
        str_ip_host: ip,
        txt_valor: datos,
        txt_descripcion:
          descripcion ||
          `Se ${diccAccion[accion]} un registro de la tabla ${tabla}`,
      },
      { transaction: t }
    );
    return {
      status: true,
    };
  } catch (err) {
    return { status: false, message: err.message };
  }
}
