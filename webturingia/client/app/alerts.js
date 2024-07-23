// alerts.js

import Swal from 'sweetalert2';

const Alerts = {
    success(message) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: message,
            confirmButtonColor: '#533273',
        });
    },
    editarS(message) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: message,
            confirmButtonColor: '#533273',
        });
    },
    registrarSuc(message) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: message,
            confirmButtonColor: '#533273',
        });
    },

    error(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#533273',
        });
    },
    errorlogin(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error al iniciar session',
            text: message,
            confirmButtonColor: '#533273',
        });
    },
    welcome: (username) => {
        Swal.fire({
          icon: 'success',
          title: 'BIENVENIDO',
          text: `¡Hola ${username}! Bienvenido a nuestra aplicación.`,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#533273',
        });
      },

    warning(message) {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: message,
            confirmButtonColor: '#533273',
        });
    },

    info(message) {
        Swal.fire({
            icon: 'info',
            title: 'Información',
            text: message,
            confirmButtonColor: '#533273',
        });
    },

    confirmation: (title, text, preConfirmAction, confirmButtonText = 'Confirmar', cancelButtonText = 'Cancelar') => {
        return Swal.fire({
          title: title,
          text: text,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#533273',
          cancelButtonColor: '#533273',
          confirmButtonText: confirmButtonText,
          cancelButtonText: cancelButtonText,
          preConfirm: preConfirmAction
        });
      },
    cancel: (message) => {
        Swal.fire({
            icon: 'info',
            title: 'Cancelación',
            text: message,
            confirmButtonText: 'Aceptar'
        });
    }
};

export default Alerts;
