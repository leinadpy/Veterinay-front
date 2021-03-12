import React from 'react'
import { Redirect, useParams } from 'react-router'
import { alertPopUp } from '../../helpers/alert';
import { fetchAction } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm';
import { Button } from '../Button';
import { Input } from '../Input';

export const RegisterScreen = ({ history }) => {

    const [formValue, handleInputChange, reset] = useForm({
        nombre: '',
        email: '',
        password: '',
        password2: '',
        nombre_veterinaria: '',
        direccion: '',
        imagenUrl: ''
    })

    const { type } = useParams();

    if (type !== "normal" && type !== "admin") {
        return <Redirect to="/register-type" />
    }

    const { nombre, email, password, password2, nombre_veterinaria, direccion } = formValue;
    let isAdmin = (type === 'admin') ? true : false;

    const dataUser = JSON.parse(localStorage.getItem('data')) || 0;


    const handleCreateUser = async (e) => {
        e.preventDefault();

        let res, data;

        if (dataUser === 0) { //usuario que NO uso Auth google

            res = await fetchAction(`Usuario`, 'POST',
                { nombre, email, password, isAdmin });

            data = await res.json();

        } else { //usuario que SI uso el Auth google

            const { displayName: nombre, email, photoURL, uid: password } = dataUser;
            const imagenUrl = photoURL.replaceAll('/', '*');

            res = await fetchAction(`Usuario/crear-cuenta-google/${email}/${nombre}/${isAdmin}/${imagenUrl}/${password}`, 'POST',
                { nombre, email, password, isAdmin, imagenUrl });

            data = await res.json();

            localStorage.clear();

            console.log(data);
        }

        /* fetch para crear la veterinaria */
        const id_usuario = data.data.id_usuario || false;
        console.log(id_usuario)

        if (id_usuario && type === 'admin') {

            res = await fetchAction(`Lugar`, 'POST',
                { nombre_veterinaria, direccion, id_usuario });

            data = await res.json();
            console.log(data);
        }

        if (data.exito) {
            reset();
            alertPopUp(
                "success",
                "Registro Existoso!",
                data.mensaje,
                "animate__animated animate__bounce",
                "animate__animated animate__backOutDown",
                false,
                1000
            );

            if ((type === "normal" && !data.data.isAuthGoogle) || (type === "admin" && !data.data.isAuthGoogle)) {
                setTimeout(() => {
                    history.replace('/login');
                    localStorage.setItem('user-login',data.data.id_usuario );
                }, 1000);

            } else {

                setTimeout(() => {
                    history.replace('/admin');
                    localStorage.setItem('user-login',data.data.id_usuario );
                }, 1000);
            }


        } else {
            alertPopUp(
                "error",
                "Upps...",
                data.mensaje,
                "animate__animated animate__bounce",
                "animate__animated animate__backOutDown",
                true,
                null
            );
        }

        // reset();
    };

    return (
        <div className="row">
            <div className="col-12">
                <p className="p-0 m-0 display-1 text-center mt-5 font fw-bold">
                    {
                        (type === "normal")
                            ? "User register"
                            : "Veterinary record"
                    }
                </p>
            </div>
            <div className={`${(type === "normal") ? "col-lg-6" : "col-lg-9"} col-11 mt-5 mx-auto rounded p-4 bg-option`}>
                <form onSubmit={handleCreateUser}>
                    {
                        (dataUser === 0)
                        &&
                        <>
                            <div className="mb-3 none">
                                <div className="row">
                                    <div className={`${(type === "normal") ? "col-12" : "col-12 col-lg-6"} mt-2`}>
                                        <Input
                                            type={"text"}
                                            id={"txt01_nombre"}
                                            name={"nombre"}
                                            label={"Name:"}
                                            clase={"form-control"}
                                            value={nombre}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className={`${(type === "normal") ? "col-12" : "col-12 col-lg-6"} mt-2`}>
                                        <Input
                                            type={"email"}
                                            id={"txt01"}
                                            name={"email"}
                                            label={"Email:"}
                                            clase={"form-control"}
                                            value={email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className={`${(type === "normal") ? "col-12" : "col-12 col-lg-6"} mt-2`}>
                                        <Input
                                            type={"password"}
                                            id={"txt01_password"}
                                            name={"password"}
                                            label={"Password:"}
                                            clase={"form-control"}
                                            value={password}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className={`${(type === "normal") ? "col-12" : "col-12 col-lg-6"} mt-2`}>
                                        <Input
                                            type={"password"}
                                            id={"txt01_password2"}
                                            name={"password2"}
                                            label={"Confirm password:"}
                                            clase={"form-control"}
                                            value={password2}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {
                        (type === "admin")
                        &&
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-12 col-lg-6 ">
                                    <Input
                                        type={"text"}
                                        id={"txt01_veterinary"}
                                        name={"nombre_veterinaria"}
                                        label={"Name veterinary"}
                                        clase={"form-control"}
                                        value={nombre_veterinaria}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-12 col-lg-6 mt-2 mt-lg-0">
                                    <Input
                                        type={"text"}
                                        id={"txt01_address"}
                                        name={"direccion"}
                                        label={"Establishment address:"}
                                        clase={"form-control"}
                                        value={direccion}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            <Button
                                type={"submit"}
                                clase={"btn btn-primary w-100 mx-1 my-2 py-3"}
                                texto={"Create now"}
                            //icono={}
                            //evento={} 
                            />
                            <Button
                                type={"submit"}
                                clase={"btn btn-primary w-100 mx-1 my-2 py-3"}
                                texto={"Back"}
                                //icono={}
                                evento={() => { history.replace('/register-type') }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
