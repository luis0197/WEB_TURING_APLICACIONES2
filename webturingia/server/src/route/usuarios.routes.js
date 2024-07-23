import { Router } from "express";
import usuariosController from "../controller/usuarios.controller.js";

const router = Router();

router.get("/", usuariosController.obtenerUsuarios);
router.get("/:id", usuariosController.obtenerUsuarioID);
router.get("/inst/:email", usuariosController.obtenerUsuarioInstitucion);
router.post("/", usuariosController.crearUsuario);
router.put("/:id", usuariosController.actualizarUsuario);
router.delete("/:id", usuariosController.eliminarUsuario);

export default router;
