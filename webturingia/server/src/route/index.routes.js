import { Router } from "express";
import usuariosRoute from "./usuarios.routes.js";
import authRoute from "./auth.route.js";
import auditoriaRoute from "./auditoria.routes.js";
import csvDataRoute from "./csvData.routes.js";
import validarTokenAuth from "../middleware/auth.middleware.js";
const router = Router();

router.use("/auth", authRoute);
router.use(validarTokenAuth);
router.use("/usuario", usuariosRoute);
router.use("/auditoria", auditoriaRoute);
router.use("/csvData", csvDataRoute);

export default router;
