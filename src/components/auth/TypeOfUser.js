import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { alertPopUp } from '../../helpers/alert';
import { fetchAction } from '../../helpers/fetch';
import { Button } from '../Button';

export const TypeOfUser = ({ history }) => {

    const dataUser = JSON.parse(localStorage.getItem('data')) || 0;

    const { dispatch } = useContext(AuthContext);

    const handleTypeUser = async (user) => {
        if (user === "normal") {

            if (dataUser === 0) {

                history.replace('/login/register/normal')
            } else {

                const { displayName: nombre, email, photoURL, uid: password } = dataUser;
                const isAdmin= false;
                const imagenUrl = photoURL.replaceAll('/', '*');

                const res = await fetchAction(`Usuario/crear-cuenta-google/${email}/${nombre}/${isAdmin}/${imagenUrl}/${password}`, 'POST',
                    { nombre, email, password, isAdmin, imagenUrl });

                const { exito, data, mensaje } = await res.json();

                console.log(data);

                if (exito) {

                    alertPopUp(
                        "success",
                        "Cuenta creada",
                        mensaje,
                        "animate__animated animate__bounce",
                        "animate__animated animate__backOutDown",
                        false,
                        1000
                    );

                    setTimeout(() => {
                        
                        dispatch({
                            type: 'login',
                            payload: {
                              id: data.id_usuario,
                              admin: data.isAdmin
                            }
                          })

                        history.replace('/user')
                        localStorage.setItem('user-login',data.id_usuario );
                    }, 1000);

                } else {
                    alertPopUp(
                        "error",
                        "Upps...",
                        "No se logro crear la cuenta",
                        "animate__animated animate__bounce",
                        "animate__animated animate__backOutDown",
                        true,
                        null
                    );
                }
            }

        } else {
            history.replace('/login/register/admin')
        }
    };

    return (
        <>
            <div className="row my-5">
                <div className="col-12 text-center font fs-2 border-bottom">
                    <p className="p-0 pb-2 m-0 display-5 fw-bold">What kind of user do you wanna be? </p>
                </div>
            </div>
            <div className="row my-3 flex mt-5 px-3">
                <div className="col-lg-5 col-12 mt-3 mt-lg-0 bg-option rounded text-center">
                    <img src="../assets/dog2.svg" className="w-100" alt="" style={{width:200, height:350}} />
                    <Button
                        clase={"btn btn-primary w-100 py-3 my-3"}
                        texto={"Normal user"}
                        //icono={}
                        evento={() => { handleTypeUser("normal") }}
                    />
                </div>
                <div className="col-lg-5 col-12 mt-3 mt-lg-0 bg-option rounded text-center">
                    <img src="../assets/dog.svg" className="w-100" alt="" style={{width:200, height:350}} />
                    <Button
                        clase={"btn btn-primary w-100 py-3 my-3"}
                        texto={"Veterinarian"}
                        //icono={}
                        evento={() => { handleTypeUser("admin") }}
                    />
                </div>
            </div>
        </>
    )
}
