import Swal from 'sweetalert2';
export const alertPopUp = (icon, title, text, popupInicio, popupFinal, showConfirmButton, timer) => {
    Swal.fire({
        icon,
        title,
        text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showClass: {
            popup: popupInicio
        },
        hideClass: {
            popup: popupFinal
        },
        showConfirmButton,
        timer
    });
}
