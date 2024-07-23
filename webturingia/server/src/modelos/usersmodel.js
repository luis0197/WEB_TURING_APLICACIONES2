import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import bcrypt from "bcryptjs";

// Define el modelo
export const User = sequelize.define(
  "tb_user",
  {
    usuarioID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombreResponsable: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    institucion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(255),
      defaultValue: "PARTICIPANTE",
      validate: {
        isIn: [["ADMIN", "PARTICIPANTE", "PUBLICO"]],
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

// Hook afterSync para crear el usuario administrador
User.afterSync(async () => {
  // Verifica si el usuario administrador ya existe
  const adminUser = await User.findOne({ where: { username: "admin" } });

  if (!adminUser) {
    // Crea el usuario administrador si no existe
    const hashedPassword = await bcrypt.hash("adminpassword", 10);
    await User.create({
      nombreResponsable: "Admin",
      institucion: "Institution",
      username: "admin",
      password: hashedPassword,
      rol: "ADMIN",
      estado: true,
      cedula: "1234567890",
    });
  }
});

// Sincronizar el modelo
sequelize.sync();