import { googleAuthProvider, firebase } from "../firebase/firebase-config";

import validator from "validator";
import { alertPopUp, ToastPopUp } from "./alert";

import { fetchAction } from "./fetch";

let res_login = false;

export const handleLogin = async (email, password, history, dispatch) => {


  if (!isFormValid(email, password)) return false;


  const res = await fetchAction(`Usuario/login/${email}&${password}`, 'POST', { email, password });

  const { exito, mensaje, data } = await res.json();
  if (exito) {

    alertPopUp("success", "Inicio de sesión correcto", null, "animate__animated animate__bounce", "animate__animated animate__backOutDown", false, 1500);

    setDispatch(data.id_usuario, data.isAdmin, history, dispatch);

    res_login = true;

  } else {
    
    alertPopUp("error", "Upps...", mensaje, "animate__animated animate__bounce", "animate__animated animate__backOutDown", true, null);
    res_login = false;
  }

  return res_login;
};


export const handleLoginGoogle = async (history, dispatch) => {

  try {

    const { user: { displayName, email, photoURL, uid } } = await firebase.auth().signInWithPopup(googleAuthProvider);

    const dataStorage = { displayName, email, photoURL, uid };

    const res = await fetchAction(`Usuario/login-google/${email}`, "POST", { email });

    const { exito, mensaje, data } = await res.json();

    if (exito) {

      sessionStorage.removeItem('data');

      alertPopUp("success", "Inicio de sesión correcto", mensaje, "animate__animated animate__bounce", "animate__animated animate__backOutDown", false, 1500);

      setDispatch(data.id_usuario, data.isAdmin, history, dispatch);
      res_login =  true
    }
    else {

      sessionStorage.setItem("data", JSON.stringify(dataStorage));
      history.push('/login/register-type');
      res_login =  true
    }

  } catch (error) {
    
    console.log(error)
    if(error.code === 'auth/popup-closed-by-user'){
      ToastPopUp('warning', 'Inicio de sesión con google cancelado')
    }
     
  }
  
  return res_login
}


// ===========	 Settings 	=======================

const setDispatch = (id, admin, history, dispatch) => {

  setTimeout(() => {
    dispatch({
      type: 'login',
      payload: {
        id,
        admin
      }
    })

    if (admin) history.replace('/admin')
    else history.replace('/user')

    localStorage.setItem('user-login', id);
    sessionStorage.removeItem('data');

  }, 1400);
};

const isFormValid = (email, password) => {

  if (validator.isEmpty(email) || validator.isEmpty(password)) {
    ToastPopUp('error', 'Los campos estan vacios')
    return false
  }

  if (!validator.isEmail(email)) {
    ToastPopUp('error', `"${email}" no es un correo valido`)
    return false
  }
  return true
};