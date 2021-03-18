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

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const ToastPopUp = (icon, title) => {
    Toast.fire({
        icon,
        title
    })
}