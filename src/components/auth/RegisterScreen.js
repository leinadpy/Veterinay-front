import React, { useState } from 'react'
import { Redirect, useParams } from 'react-router'

import { createUser } from '../../helpers/createUser';
import { location, seleccionarlugar } from '../../helpers/map';
import { useForm } from '../../hooks/useForm';
import { Button } from '../Button';
import { Input } from '../Input';
import { MapaScreen } from '../mapa/MapaScreen';

export const RegisterScreen = ({ history }) => {

    const [lugares, setLugares] = useState([])
    const [coordenadas, setCoordenadas] = useState([])
    const [disabled, setDisabled] = useState(false);

    const [formValue, handleInputChange] = useForm({
        nombre: '',
        email: '',
        password: '',
        password2: '',
        nombre_veterinaria: '',
        direccion: '',
        imagenUrl: ''
    })

    const { nombre, email, password, password2, nombre_veterinaria, direccion } = formValue;

    const [direccionVeteriniaria, setDireccionVeteriniaria] = useState(direccion);

    const { type } = useParams();


    if (type !== "normal" && type !== "admin") {
        return <Redirect to="/register-type" />
    }

    let isAdmin = (type === 'admin') ? true : false;

    const dataUser = JSON.parse(localStorage.getItem('data')) || 0;


    const handleCreateUser = async (e) => {

        e.preventDefault();

        setDisabled(true)

        createUser(type, dataUser, isAdmin, direccionVeteriniaria, history, formValue);

        setDisabled(false)

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
            <div className={`${(type === "normal") ? "col-lg-6" : "col-lg-8"} col-11 mt-5 mx-auto rounded p-4 bg-option`}>
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
                        <>
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
                                <div className="row">
                                    <div className="col-12 text-end mt-2">
                                        <Button
                                            type={"button"}
                                            clase={"btn btn-outline-info"}
                                            texto={"Buscar"}
                                            des={
                                                (disabled) ? true : false
                                            }
                                            evento={async (e) => {
                                                e.preventDefault();
                                                const res_map = await location(direccion);
                                                setLugares(res_map);
                                            }} 
                                        icono={"fas fa-search ms-2"}
                                        />

                                    </div>
                                </div>
                            </div>
                        </>
                    }


                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            <Button
                                type={"submit"}
                                clase={"btn btn-success w-100 mx-1 my-2 py-3"}
                                texto={"Create now"}
                                des={
                                    (disabled) ? true : false
                                }
                            //icono={}
                            //evento={} 
                            />
                            <Button
                                type={"submit"}
                                clase={"btn btn-dark w-100 mx-1 my-2 py-3"}
                                texto={"Back"}
                                //icono={}
                                evento={(e) => {
                                    e.preventDefault();
                                    history.replace('/login/register-type')
                                }}
                                des={
                                    (disabled) ? true : false
                                }
                            />
                        </div>
                    </div>
                </form>

            </div>
            {
                (type === "admin")
                &&
                <>
                    <div className="col-4 mx-auto mt-5">
                        <div className="row">
                            <div className="col-12" style={{ height: 400 }}>
                                <MapaScreen coordenadas={coordenadas} />
                            </div>
                            <div className="col-12 mt-2">
                                <select className="form-select" onChange={async (e) => {
                                    setDireccionVeteriniaria(e.target.value)
                                    const res_map = await seleccionarlugar(e.target.value);
                                    setCoordenadas(res_map)

                                }}>
                                    <option value="">Despliga estas opciones</option>
                                    {
                                        (lugares) && lugares.map(l => (
                                            <option key={l.id} value={l.place_name_es} >{l.place_name_es}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                </>

            }
        </div>
    )
}
