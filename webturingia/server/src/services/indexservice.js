import usuariosService from "../services/usuarios/usuarios.service.js";

function ServiceGeneral(parameter, nombreModelo, nombreServicio) {
  switch (nombreModelo) {
    case "usuarios":
      switch (nombreServicio) {
        case "crearUsuario":
          return usuariosService.crearUsuario(parameter);
        case "logginUsuario":
          return usuariosService.loggin(parameter);

      }

  }
}

export default ServiceGeneral
