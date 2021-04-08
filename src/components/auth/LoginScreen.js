import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";


import { useForm } from "../../hooks/useForm";
import { Button } from "../Button";
import { Input } from "../Input";
import { AuthContext } from "../../auth/AuthContext";
import { handleLogin, handleLoginGoogle } from "../../helpers/typeLogin";

export const LoginScreen = ({ history }) => {


  const [disabled, setDisabled] = useState(false)

  const { dispatch } = useContext(AuthContext);

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleTypeLogin = async (e, google = false) => {
    e.preventDefault();

    let res_login = null;
    
    setDisabled(true)

    if (!google) {
      res_login = await handleLogin(email, password, history, dispatch);
    } else {
      res_login = await handleLoginGoogle(history, dispatch);
    }

    if (!res_login) {
      setDisabled(false)
    }


  };

  return (
    <div className="row">
      <div className="col-12">
        <p className="p-0 m-0 display-1 text-center font mt-2 fw-bold">Inicio de sesión
          <lord-icon
            src="https://cdn.lordicon.com//wzckbizc.json"
            trigger="hover"
            colors="primary:#121331,secondary:#08a88a"
            stroke="100"
            scale="50"
            axis-x="51"
            style={{ width: 128, height: 128 }}>
          </lord-icon>
        </p>
      </div>

      <div className="col-11 col-lg-5 mx-auto p-3 p-lg-0 bg-option  rounded mt-4 animate__animated animate__backInLeft">
        <img src="./assets/cats.svg" className="w-100 h-100 animate__animated animate__repeat-2	animate__shakeX animate__delay-2s animate__slower" alt="imagen de gatos con la palabra Welcome"/>
      </div>

      <div className="col-lg-7 col-11 mt-4 mx-auto rounded p-4  bg-option">
        <form onSubmit={handleTypeLogin}>
          <div className="mb-4">
            <Input
              type={"text"}
              id={"txt01"}
              name={"email"}
              label={"Correo electrónico:"}
              clase={"form-control"}
              value={email}
              onChange={handleInputChange}
            />

          </div>
          <div className="mb-4">
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
              <Link to="/login/register-type" onClick={() => sessionStorage.removeItem('data')} className="text-secondary">
                <b>Crear una cuenta</b>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col d-lg-flex justify-content-between">
              <Button
                type={"submit"}
                clase={"btn btn-primary w-100 mx-1 my-2 py-3"}
                texto={"Iniciar con la aplicación"}
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
                texto={"Iniciar con google"}
                icono={"fab fa-google fs-3 mx-3"}
                evento={(e) => { handleTypeLogin(e, true) }}
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
