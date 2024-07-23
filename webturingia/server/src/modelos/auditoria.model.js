import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import { User } from "./usersmodel.js";

export const auditoriaAccion = sequelize.define(
  "tb_auditoria",
  {
    lng_id_accion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usuarioID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dt_fecha: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    str_ip_host: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    str_nombre_tabla: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    str_accion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    txt_descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    txt_valor: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dt_fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    dt_fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
