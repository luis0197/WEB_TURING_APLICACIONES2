import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const CsvData = sequelize.define(
  "tb_csvData",
  {
    confidence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    processedImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    conductor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    peaton: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bicicleta: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carro: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    furgoneta: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    camion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    triciclo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    moto: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);
