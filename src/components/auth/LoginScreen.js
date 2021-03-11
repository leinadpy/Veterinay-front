import React from "react";
import { Link, Redirect } from "react-router-dom";

import { alertPopUp } from "../../helpers/alert";
import { googleAuthProvider, firebase } from "../../firebase/firebase-config";
import { fetchAction } from "../../helpers/fetch";
import { useForm } from "../../hooks/useForm";
import { Button } from "../Button";
import { Input } from "../Input";

export const LoginScreen = ({history}) => {
  const [formValues, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = async (e) => {
    e.preventDefault();
    reset();
    const res = await fetchAction(`Usuario/${email}&${password}`);
    const { exito, mensaje } = await res.json();
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
    }
  };

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    try {
      const {
        user: { displayName, email, photoURL, uid },
      } = await firebase.auth().signInWithPopup(googleAuthProvider);

      const data = {
        displayName,
        email,
        photoURL,
        uid,
      };

      localStorage.setItem("data", JSON.stringify(data));

      const res = await fetchAction(
        `Usuario/login-google/${email}`,
        "POST",
        email
      );
      const { exito, mensaje, data: datos } = await res.json();
        
      if (exito) {

        alertPopUp(
          "success",
          "Inicio de sesión correcto",
          mensaje,
          "animate__animated animate__bounce",
          "animate__animated animate__backOutDown",
          false,
          1000
        );
        setTimeout(() => {

          if (data.isAdmin) return <Redirect to="/admin" />;
          else return <Redirect to="/user" />;

        }, 1000);

      }else {

        history.push('/register-type')

      }
    } catch (error) {
      console.log(error);
    }
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
              <Link to="/register-type" className="text-secondary">
                {" "}
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
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
