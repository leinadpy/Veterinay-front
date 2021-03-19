import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import validator from 'validator';

import { alertPopUp, ToastPopUp } from "../../helpers/alert";
import { googleAuthProvider, firebase } from "../../firebase/firebase-config";
import { fetchAction } from "../../helpers/fetch";
import { useForm } from "../../hooks/useForm";
import { Button } from "../Button";
import { Input } from "../Input";
import { AuthContext } from "../../auth/AuthContext";

export const LoginScreen = ({ history }) => {

  const [disabled, setDisabled] = useState(false)
  
  const { dispatch } = useContext(AuthContext);

  const [formValues, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }
    setDisabled(true);
    // console.log({email, password}); return;
    const res = await fetchAction(`Usuario/login/${email}&${password}`, 'POST', { email, password });
    const { exito, mensaje, data } = await res.json();
    if (exito) {
      alertPopUp(
        "success",
        "Inicio de sesión correcto",
        null,
        "animate__animated animate__bounce",
        "animate__animated animate__backOutDown",
        false,
        1500
      );

      setTimeout(() => {
        dispatch({
          type: 'login',
          payload: {
            id: data.id_usuario,
            admin: data.isAdmin
          }
        })
      }, 1500);

      setTimeout(() => {
        if (data.isAdmin) history.replace('/admin')
        else history.replace('/user')
        localStorage.setItem('user-login', data.id_usuario);
        localStorage.removeItem('data');
      }, 1400);

    } else {
      alertPopUp(
        "error",
        "Upps...",
        mensaje,
        "animate__animated animate__bounce",
        "animate__animated animate__backOutDown",
        true,
        null
      );

      setDisabled(false)
    }
  };

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    
    try {
      setDisabled(true);
      const {
        user: { displayName, email, photoURL, uid },
      } = await firebase.auth().signInWithPopup(googleAuthProvider);

      const dataStorage = {
        displayName,
        email,
        photoURL,
        uid,
      };



      const res = await fetchAction(
        `Usuario/login-google/${email}`,
        "POST",
        { email }
      );


      const { exito, mensaje, data } = await res.json();

      if (exito) {
        localStorage.removeItem('data');
        reset();

        alertPopUp(
          "success",
          "Inicio de sesión correcto",
          mensaje,
          "animate__animated animate__bounce",
          "animate__animated animate__backOutDown",
          false,
          1500
        );

        setTimeout(() => {
          dispatch({
            type: 'login',
            payload: {
              id: data.id_usuario,
              admin: data.isAdmin
            }
          })

          localStorage.setItem('user-login', data.id_usuario);

          if (data.isAdmin) {
            history.replace('/admin')
          }
          else {
            history.replace('/user')
          }
        }, 1500);

  

      }
      else {
        
        localStorage.setItem("data", JSON.stringify(dataStorage));
        history.push('/login/register-type');

      }
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };

  const isFormValid = () => {

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      ToastPopUp('error', 'Los campos estan vacios')
      return false
    }

    if(!validator.isEmail(email)){
      ToastPopUp('error', `"${email}" no es un correo valido`)
      return false
    }


    return true
  };

  return (
    <div className="row">
      <div className="col-12">
        <p className="p-0 m-0 display-1 text-center mt-5 font fw-bold">Login</p>
      </div>
      <div className="col-lg-6 col-11 mt-5 mx-auto rounded p-4 bg-option">
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <Input
              type={"text"}
              id={"txt01"}
              name={"email"}
              label={"Email address:"}
              clase={"form-control"}
              value={email}
              onChange={handleInputChange}
            />

            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <Input
              type={"password"}
              id={"txt02"}
              name={"password"}
              label={"Password:"}
              clase={"form-control"}
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className="row my-4 font">
            <div className="col text-end">
              <Link to="/login/register-type" onClick={()=> localStorage.removeItem('data')} className="text-secondary">
                Create a count
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col d-lg-flex justify-content-between">
              <Button
                type={"submit"}
                clase={"btn btn-primary w-100 mx-1 my-2 py-3"}
                texto={"Login with app"}
                des={
                  (disabled) ? true : false
                }
              //icono={}
              />
              <Button
                type={"submit"}
                clase={
                  "btn btn-light w-100 mx-1 my-2 py-3 d-flex justify-content-center align-items-center"
                }
                texto={"Sing in with google"}
                icono={"fab fa-google fs-3 mx-3"}
                evento={handleLoginGoogle}
                des={
                  (disabled) ? true : false
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
