import validator from "validator";
import { alertPopUp, ToastPopUp } from "./alert";
import { fetchAction } from "./fetch";


export const actionCard = async (history, type, data_cita, bandera, id_veteriniaria, id_usuario, { titulo, nombre_mascota, tipo_animal, fecha_cita, hora_cita, situacion }) => {

    const id_v = (bandera) ? data_cita.id_veteriniaria : id_veteriniaria;

    if (type === 'normal' && data_cita !== -1) { // va a actualizar

        actionRequest(`Cita/${data_cita.id_cita}`,'PUT',history,titulo, nombre_mascota, tipo_animal, fecha_cita, hora_cita, situacion,id_usuario, id_v, data_cita.id_cita);

    }
    else if (type === 'normal' && data_cita === -1) { //va a crear una cita

        actionRequest('Cita','POST',history,titulo, nombre_mascota, tipo_animal, fecha_cita, hora_cita, situacion,id_usuario, id_veteriniaria, data_cita?.id_cita);

    }
    else if (type === 'admin') { //va a aceptar la cita

        const res = await fetchAction(`Cita/cita/${data_cita.id_cita}&${1}`, 'PUT', { id_cita: data_cita.id_cita, aceptada: 1 });

        const data = await res.json();

        actionResponse(history, 'admin', data.exito, data.mensaje);

    }

};

export const actionNegative = async(history,type,data_cita) => {

    if (type === 'normal' && data_cita !== -1) {

        const resDelte = await fetchAction(`Cita/${data_cita.id_cita}`, 'DELETE', { id:data_cita.id_cita });
        const data = await resDelte.json();

        actionResponse(history, 'user', data.exito, data.mensaje);

    } else if (type === 'admin' && data_cita !== -1) {

        const res = await fetchAction(`Cita/cita/${data_cita.id_cita}&${2}`, 'PUT', { id_cita:data_cita.id_cita, aceptada:2 });
        const data = await res.json();

        actionResponse(history, 'admin', data.exito, data.mensaje);
    }
};

// ===========	 hacer la peticion 	=======================
const actionRequest = async(url, action,history, titulo, nombre_mascota, tipo_animal, fecha_cita, hora_cita, situacion,id_usuario, id_veteriniaria, id_cita) => {

    if (!isFormValid(titulo, nombre_mascota, tipo_animal, fecha_cita, hora_cita, situacion, id_veteriniaria)) return;

    const res = await fetchAction(`${url}`, `${action}`, { titulo, nombre_mascota, tipo_animal, fecha_cita, hora_cita, situacion, id_usuario, id_cita, id_veteriniaria });

    const data = await res.json();

    actionResponse(history, 'user', data.exito, data.mensaje);

};

// ===========	 Respuesta de la solicitud 	=======================
const actionResponse = (history, path, exito, mensaje) => {

    if (exito) {
        alertPopUp("success", "Operación completada", mensaje, "animate__animated animate__bounce", "animate__animated animate__backOutDown", false, 1500);
        history.replace(`/${path}`);
        sessionStorage.removeItem('data-cita')
    }
};

// ===========	 Settings 	=======================
const isFormValid = (titulo, nombre_mascota, tipo_animal, fecha_cita, hora_cita, situacion, id_v) => {

    if (validator.isIn('', [titulo, nombre_mascota, tipo_animal, fecha_cita, hora_cita, situacion])) {

        ToastPopUp('error', 'Todos los campos son obligatorios')
        return false;
    }

    if (!id_v || id_v === 0) {
        ToastPopUp('error', 'Selecciona una veterinaria')
        return false;
    }

    return true;

};

