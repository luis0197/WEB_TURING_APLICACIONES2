import { Router } from "express";

import authController from "../controller/auth/auth.controller.js";
import usuariosController from "../controller/usuarios.controller.js";

const router = Router();

router.post("/login", authController.login);
router.post("/register", usuariosController.crearUsuario);

export default router;
