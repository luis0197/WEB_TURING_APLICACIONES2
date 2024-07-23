import { app, httpServer } from "./app.js";
import { sequelize } from "./database/sequelize.js";

async function startServer() {
  try {
    await sequelize.sync({ alter: true });

    sequelize
      .authenticate()
      .then(() => {
        console.log(
          "conexxion a la base de datos establecida correctamente 😍😘💕"
        );
      })
      .catch((err) => {
        console.error(
          "no se pudo establecer la conexion a la base de datos 🤦‍♂️😥😭"
        );
      });
    httpServer.listen(app.get("port"), () => {
      console.log("Servidor en puerto: ", app.get("port"));
    });
  } catch (error) {
    console.log("error => ", error);
  }
}

startServer();
export default { startServer };
