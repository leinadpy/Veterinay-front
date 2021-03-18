import React, { useState } from 'react'
import { Redirect, useParams } from 'react-router'
import validator from 'validator';
import { alertPopUp, ToastPopUp } from '../../helpers/alert';
import { fetchAction } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm';
import { Button } from '../Button';
import { Input } from '../Input';
import { MapaScreen } from '../mapa/MapaScreen';

export const RegisterScreen = ({ history }) => {

    const [lugares, setLugares] = useState([])
    const [coordenadas, setCoordenadas] = useState([])
    const [disabled, setDisabled] = useState(false);

    const [formValue, handleInputChange, reset] = useForm({
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



    const location = async (e) => {
        e.preventDefault();

        if (validator.isEmpty(direccion)) {
            ToastPopUp('error', 'Escribe un lugar primero antes de buscar');
            return
        }

        const url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direccion}.json?autocomplete=true&language=es&access_token=pk.eyJ1IjoiZnJhbmtvMzYxIiwiYSI6ImNrbWJhbGU2dTFnbjEydm51eDY3M2c2NXEifQ.oJmUO9i2jcaLd0EpkWnhmQ`;

        const data = await fetch(url_mapbox);
        const res = await data.json();
        setLugares(res.features);

        ToastPopUp('success', 'Selecciona una opcion debajo del mapa');
    };


    const seleccionarlugar = async (e) => {

        if(validator.isEmpty(e.target.value)){
            ToastPopUp('error', 'elige una opcion valida');
            return
        }

        setDireccionVeteriniaria(e.target.value)

        try {
            const url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?autocomplete=true&language=es&access_token=pk.eyJ1IjoiZnJhbmtvMzYxIiwiYSI6ImNrbWJhbGU2dTFnbjEydm51eDY3M2c2NXEifQ.oJmUO9i2jcaLd0EpkWnhmQ`;

            const data = await fetch(url_mapbox);
            const res = await data.json();
            localStorage.setItem('location', JSON.stringify(res.features[0].center));
            setCoordenadas(res.features[0].center)
            ToastPopUp('success', 'Da click en el mapa');

        } catch (error) {
            console.log(error)
        }

    };


    const handleCreateUser = async (e) => {
        e.preventDefault();
       
        if(type==='admin' && dataUser!== 0 &&  !isFormValidAdmin()){ // con google
       
            console.log('error admin google')
            return
        }
        else if((type === 'admin') && dataUser===0 && (!isFormValidAdmin() || !isFormValidUser())){ //sin google
            console.log('error admin')
            return
        }
        else if(type === 'normal' && !isFormValidUser()){ //normal
            console.log('error normal')
            return
        }

        let res, data;

        if (dataUser === 0) { //usuario que NO uso Auth google
            setDisabled(true)
            res = await fetchAction(`Usuario`, 'POST',
                { nombre, email, password, isAdmin });

            data = await res.json();

        } else { //usuario que SI uso el Auth google

            setDisabled(true)
            const { displayName: nombre, email, photoURL, uid: password } = dataUser;
            const imagenUrl = photoURL.replaceAll('/', '*');

            res = await fetchAction(`Usuario/crear-cuenta-google/${email}/${nombre}/${isAdmin}/${imagenUrl}/${password}`, 'POST',
                { nombre, email, password, isAdmin, imagenUrl });

            data = await res.json();

            
            localStorage.removeItem('location');
        }
        

        const id_usuario = data.data.id_usuario || false;
        if (id_usuario && type === 'admin') {

            const respVeterinaria = await fetchAction(`Lugar`, 'POST',
                { nombre_veterinaria, direccion: direccionVeteriniaria, id_usuario });

            const dataVeterinaria = await respVeterinaria.json();
    
        }
        
        if (data.exito) {
            reset();
            localStorage.removeItem('location');
            alertPopUp(
                "success",
                "Registro Existoso!",
                data.mensaje,
                "animate__animated animate__bounce",
                "animate__animated animate__backOutDown",
                false,
                1000
            );
            
            if ((type === "normal" && !data.data?.isAuthGoogle) || (type === "admin" && !data.data?.isAuthGoogle)) {
                setTimeout(() => {
                    history.replace('/login');
                    localStorage.setItem('user-login', id_usuario);
                }, 1000);

            } else {

                setTimeout(() => {
                    history.replace('/admin');
                    localStorage.setItem('user-login', id_usuario);
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
    };

    const isFormValidUser = () => {

        if (validator.isIn('', [nombre, email, password, password2])) {
            ToastPopUp('error', 'Todos los campos son obligatorios')
            return false;
        }
        
        if( !validator.isByteLength(password,{min:5}) ){
            ToastPopUp('error', 'La contraseña debde de ser minimo 5 caracteres')
            return false;
        }
        if(!validator.equals(password,password2)){
            ToastPopUp('error', 'Las contraseñas son diferentes')
            return false;
        }
        if(!validator.isEmail(email)){
            ToastPopUp('error', 'Las contraseñas son diferentes')
            return false;
        }
        return true;
    };

    const isFormValidAdmin=()=>{
        if(validator.isEmpty(nombre_veterinaria)){
            ToastPopUp('error', 'Todos los campos son obligatorios')
            return false;
        }
        if (validator.isEmpty(direccionVeteriniaria)) {
            ToastPopUp('error', 'Busca la dirección en las opciones')
            return false;
        }

        return true
    }


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
                                        <button
                                            className="btn btn-outline-info"
                                            onClick={location}
                                        >Search</button>
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
                                <select className="form-select" onChange={seleccionarlugar}>
                                    <option value="">Despliga estas opciones</option>
                                    {
                                        lugares.map(l => (
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
