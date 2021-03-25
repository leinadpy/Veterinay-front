import validator from "validator";
import { alertPopUp, ToastPopUp } from "./alert";
import { fetchAction } from "./fetch";

export const updateUser = async (history, data_usuario, direccionVeteriniaria, { nombre, password, email, telefono, veterinaria }) => {


    const tel = (telefono.trim() === '') ? 'none' : telefono.trim();
    const google = data_usuario?.data_user?.isAuthGoogle || data_usuario?.isAuthGoogle;

    if (data_usuario?.data_user?.isAdmin) {

        if (!isFormValid(google, true, nombre, email, password, data_usuario, direccionVeteriniaria)) {
            return;
        }

        const id_usuario = data_usuario.data_user.id_usuario;

        const id_veteriniaria = data_usuario[0].idVeterinaria;

        const res_user = await fetchAction(`Usuario/admin/${id_usuario}&${nombre}&${tel}`, 'PUT', { id_usuario, nombre, telefono: tel })

        const data_user = await res_user.json();

        const res_lugar = await fetchAction(`Lugar/${id_veteriniaria}`, 'PUT', { id_veteriniaria, nombre_veterinaria: veterinaria, direccion: direccionVeteriniaria, id_usuario });

        const data_lugar = await res_lugar.json();

        const exito = (data_lugar.exito && data_user.exito) ? true : false

        resUpdate(history, exito, 'admin');
    }
    else {

        if (!isFormValid(google, false, nombre, email, password, data_usuario, veterinaria)) {
            return;
        }

        const id_usuario = data_usuario.id_usuario;

        const res_user = await fetchAction(`Usuario/normal/${id_usuario}&${nombre}&${tel}&${email}&${password}`, 'PUT', { id_usuario, nombre, password, email, telefono: tel });

        const data_user = await res_user.json();

        resUpdate(history, data_user.exito, 'user')
    }
};



const resUpdate = (history, exito, path) => {

    if (exito) {

        sessionStorage.removeItem('data-usuario');

        alertPopUp("success", "Actualizacion completa", "Su registro fue actualizado correctamente", "animate__animated animate__bounce", "animate__animated animate__backOutDown", false, 1500);

        setTimeout(() => {
            history.replace(`/${path}`)
        }, 1450);
    }
};

// ===========	 Settings 	=======================

const isFormValid = (google, admin, nombre, email, password, data_usuario, veterinaria) => {

    if (google) { //usuario Google
        if (validator.isEmpty(nombre)) {
            ToastPopUp('error', 'El campo nombre es requerido')
            return false;
        }
        if (admin) {
            if (validator.isEmpty(data_usuario[0].idVeterinaria) || validator.isEmpty(veterinaria) || !data_usuario[0].idVeterinaria) {
                ToastPopUp('error', 'Los datos de la veterinaria son obligatorios')
                return false;
            }

        }

    }
    else { //usuario NO google
        if (validator.isIn('', [nombre, email, password])) {
            ToastPopUp('error', 'Todos los campos son obligatorios')
            return false;
        }
        if (admin) {
            if (validator.isEmpty(data_usuario[0].idVeterinaria) || !data_usuario[0].idVeterinaria) {
                ToastPopUp('error', 'Los datos de la veterinaria son obligatorios')
                return false;
            }
        }
    }

    return true;
};
