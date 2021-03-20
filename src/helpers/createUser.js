import validator from "validator";
import { alertPopUp, ToastPopUp } from "./alert";
import { fetchAction } from "./fetch";


export const createUser = async (type, dataUser,isAdmin, direccionVeteriniaria,history,{ nombre, email, password, password2, nombre_veterinaria}) => {


    if (!validacion(type, dataUser,nombre, email, password, password2, nombre_veterinaria,direccionVeteriniaria)) return;

    let res, data;

    if (dataUser === 0) { //usuario que NO uso Auth google

        res = await fetchAction(`Usuario`, 'POST',
            { nombre, email, password, isAdmin });

        data = await res.json();

    } else { //usuario que SI uso el Auth google

        const { displayName: nombre, email, photoURL, uid: password } = dataUser;

        const imagenUrl = photoURL.replaceAll('/', '*');

        res = await fetchAction(`Usuario/crear-cuenta-google/${email}/${nombre}/${isAdmin}/${imagenUrl}/${password}`, 'POST',{ nombre, email, password, isAdmin, imagenUrl });

        data = await res.json();

        localStorage.removeItem('location');
    }


    // crear veterinaria
    createVeternary(data.data.id_usuario, type, nombre_veterinaria, direccionVeteriniaria );

    redirectUser(type,data, history);

};

// ===========	 Redirect TO ... 	=======================
const redirectUser = (type,data, history) => {
    if (data.exito) {

        localStorage.removeItem('location');

        alertPopUp("success", "Registro Existoso!", data.mensaje, "animate__animated animate__bounce", "animate__animated animate__backOutDown", false, 1200);


        if ((type === "normal" && !data.data?.isAuthGoogle) || (type === "admin" && !data.data?.isAuthGoogle)) {

            setTimeout(() => {
                history.replace('/login');
                localStorage.setItem('user-login', data.data.id_usuario);
            }, 1000);

        } else {

            setTimeout(() => {
                history.replace('/admin');
                localStorage.setItem('user-login', data.data.id_usuario);
            }, 1000);

        }


    } else {

        alertPopUp("error", "Upps...", data.mensaje, "animate__animated animate__bounce", "animate__animated animate__backOutDown", true, null);

    }
};

// ===========	 Add veterinary 	=======================

const createVeternary = async(id, type, nombre_veterinaria, direccion) => {

    // const id_usuario = data.data.id_usuario || false;
    const id_usuario = id || false;

    if (id_usuario && type === 'admin') {

        await fetchAction(`Lugar`, 'POST',{ nombre_veterinaria, direccion, id_usuario });
    }
};

// ===========	 Settings 	=======================

const validacion = (type, dataUser,nombre, email, password, password2,nombre_veterinaria, direccionVeteriniaria) => {
    if (type === 'admin' && dataUser !== 0 && !isFormValidAdmin(nombre_veterinaria, direccionVeteriniaria)) { // con google

        console.log('error admin google')
        return false
    }
    else if ((type === 'admin') && dataUser === 0 && (!isFormValidAdmin(nombre_veterinaria, direccionVeteriniaria) || !isFormValidUser(nombre, email, password, password2))) { //sin google

        console.log('error admin')
        return false
    }
    else if (type === 'normal' && !isFormValidUser(nombre, email, password, password2)) { //normal
        console.log('error normal')
        return false
    }

    return true
};

const isFormValidUser = (nombre, email, password, password2) => {

    if (validator.isIn('', [nombre, email, password, password2])) {
        ToastPopUp('error', 'Todos los campos son obligatorios')
        return false;
    }

    if (!validator.isByteLength(password, { min: 5 })) {
        ToastPopUp('error', 'La contraseña debde de ser minimo 5 caracteres')
        return false;
    }
    if (!validator.equals(password, password2)) {
        ToastPopUp('error', 'Las contraseñas son diferentes')
        return false;
    }
    if (!validator.isEmail(email)) {
        ToastPopUp('error', 'Las contraseñas son diferentes')
        return false;
    }
    return true;
};

const isFormValidAdmin = (nombre_veterinaria, direccionVeteriniaria) => {

    if (validator.isEmpty(nombre_veterinaria)) {
        ToastPopUp('error', 'Todos los campos son obligatorios')
        return false;
    }
    if (validator.isEmpty(direccionVeteriniaria)) {
        ToastPopUp('error', 'Busca la dirección en las opciones')
        return false;
    }

    return true
}