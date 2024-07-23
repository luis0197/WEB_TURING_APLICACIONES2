import { Sequelize } from "sequelize";
import { ConfigVariables } from "../config/variablesconfigsequelize.js";

export const sequelize = new Sequelize(
  ConfigVariables.dbName,
  ConfigVariables.dbUser,
  ConfigVariables.dbPassword,
  {
    host: ConfigVariables.dbServer,
    port: ConfigVariables.dbPort,
    logging: false,
    dialect:ConfigVariables.dbDialect
    //logging: console.log
  }
);
