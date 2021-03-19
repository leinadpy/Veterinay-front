import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router';
import validator from 'validator';
import { alertPopUp, ToastPopUp } from '../../helpers/alert';
import { fetchAction, fetchMap } from '../../helpers/fetch';
import { getVeterinariaById } from '../../helpers/getVeterinariaById';
import { getVeterinarias } from '../../helpers/getVeterinarias';
import { useForm } from '../../hooks/useForm';
import { Button } from '../Button';
import { Input } from '../Input';
import { MapaScreen } from '../mapa/MapaScreen';

export const ShowCardScreen = ({ history }) => {

    const { type } = useParams();
    const {admin} = JSON.parse(localStorage.getItem('user')) || -1;


    if (admin === true && type === 'admin') {

        console.log('ok eres admin y estas en url admin')

    } else if (admin === false && type === 'admin') {

        return <Redirect to={'/user'} /> //no eres admin y quieres entrar a la url admin

    } else if (admin === false && type === 'normal') {

        console.log('ok eres user nomral y estas en url de user normal')

    } else if (admin === true && type === 'normal') {

        return <Redirect to={'/admin'}/> //eres admin y quieres entrar a la url user normal

    } else if (admin === true && type !== 'admin') {

        return  <Redirect to={'/admin'}/>

    } else if (admin === false && type !== 'normal') {

        return <Redirect to={'/user'}/>
    }


    const id_usuario = localStorage.getItem('user-login') || -1;
    const data_cita = JSON.parse(localStorage.getItem('data-cita')) || -1;
    const user_cita = JSON.parse(localStorage.getItem('id-user-cita')) || -1;
    const username = JSON.parse(localStorage.getItem('id-user-cita')) || -1;


    const [listVeterinary, setListVeterinary] = useState([]);
    const [id_veteriniaria, setVeterinariaId] = useState(0);
    const [nameVeterinaria, setNameVeterinaria] = useState('')
    const [coordenadas, setCoordenadas] = useState([])
    const [bandera, setBandera] = useState(true);

    const [formValues, handleInputChange] = useForm({
        titulo: data_cita?.titulo || '',
        nombre_mascota: data_cita?.nombre_mascota || data_cita?.mascota || '',
        tipo_animal: data_cita?.tipo_animal || data_cita?.mascota || '',
        fecha_cita: data_cita?.fecha_cita || data_cita?.fecha || '',
        hora_cita: data_cita?.hora_cita || data_cita?.hora || '',
        situacion: data_cita?.situacion || data_cita?.sitaucion || '',
    });

    const { titulo,
        nombre_mascota,
        tipo_animal,
        fecha_cita,
        hora_cita,
        situacion } = formValues;

    useEffect(() => {
        getVeterinarias()
            .then(({ data }) => {
                console.log(data);
                setListVeterinary(data);
            })
    }, [id_usuario, type])


    useEffect(() => {
        if (data_cita?.id_veteriniaria && type === 'normal') {
            getVeterinariaById(data_cita.id_veteriniaria)
                .then((res) => {
                    setNameVeterinaria(res.data?.veterinaria);
                    setBandera(true)
                })
        }
    }, [type, data_cita?.id_veteriniaria])




    const handleSubmit = async (e) => {
        e.preventDefault();


        if (type === 'normal' && data_cita !== -1) { // va a actualizar
            const id_v = (bandera) ? data_cita.id_veteriniaria : id_veteriniaria;
            
            if(!isFormValid(id_v)){
                return;
            }

            if(!id_v){

                ToastPopUp('error', 'Selecciona una veterinaria')
                return 
            }


            console.log('fetch para ACTUALIZAR cita');
            const data = {
                titulo,
                nombre_mascota,
                tipo_animal,
                fecha_cita,
                hora_cita,
                situacion,
                id_usuario,
                id_cita: data_cita.id_cita,
                id_veteriniaria: id_v
            }

            const res = await fetchAction(`Cita/${data_cita.id_cita}`, 'PUT', data);
            const dataChange = await res.json();

            if (dataChange?.exito) {
                alertPopUp(
                    "success",
                    "Operación completada",
                    dataChange?.mensaje,
                    "animate__animated animate__bounce",
                    "animate__animated animate__backOutDown",
                    false,
                    1500
                );
                localStorage.removeItem('data-cita')
                history.replace('/user')

            }


        } else if (type === 'normal' && data_cita === -1) { //va a crear una cita

            if(!isFormValid() ){
                return;
            }
            if(id_veteriniaria===0){

                ToastPopUp('error', 'Selecciona una veterinaria')
                return 
            }

            console.log('fetch para CREAR cita');
            const res = await fetchAction('Cita', 'POST', {
                titulo,
                nombre_mascota,
                tipo_animal,
                fecha_cita,
                hora_cita,
                situacion,
                id_veteriniaria,
                id_usuario
            });

            const data = await res.json();
            console.log(data);
            if (data.exito) {
                alertPopUp(
                    "success",
                    "Operación completada",
                    data?.mensaje,
                    "animate__animated animate__bounce",
                    "animate__animated animate__backOutDown",
                    false,
                    1500
                );
                history.replace('/user');
            }

        } else if (type === 'admin') {

            console.log('fetch para ACEPTAR cita');

            const aceptada = 1;
            const id_cita = data_cita.id_cita;

            const res = await fetchAction(`Cita/cita/${id_cita}&${aceptada}`, 'PUT', { id_cita, aceptada });
            const data = await res.json();

            if (data.exito) {
                alertPopUp(
                    "success",
                    "Operación completada",
                    data?.mensaje,
                    "animate__animated animate__bounce",
                    "animate__animated animate__backOutDown",
                    false,
                    1500
                );
                history.replace('/admin');
                localStorage.removeItem('data-cita')
            }

        }

    };

    const handleDelete = async (e) => {
        e.preventDefault();

        if (type === 'normal' && data_cita !== -1) {
            console.log('eliminando...');
            const id = data_cita.id_cita;

            const resDelte = await fetchAction(`Cita/${id}`, 'DELETE', { id });
            const dataEle = await resDelte.json();

            if (dataEle.exito) {
                alertPopUp(
                    "success",
                    "Operación completada",
                    dataEle?.mensaje,
                    "animate__animated animate__bounce",
                    "animate__animated animate__backOutDown",
                    false,
                    1500
                );
                localStorage.removeItem('data-cita')
                history.replace('/user')

            }
        } else if (type === 'admin' && data_cita !== -1) {

            console.log('fetch para RECHAZAR cita');

            const aceptada = 2;
            const id_cita = data_cita.id_cita;

            const res = await fetchAction(`Cita/cita/${id_cita}&${aceptada}`, 'PUT', { id_cita, aceptada });
            const data = await res.json();

            if (data.exito) {
                alertPopUp(
                    "success",
                    "Operación completada",
                    data?.mensaje,
                    "animate__animated animate__bounce",
                    "animate__animated animate__backOutDown",
                    false,
                    1500
                );
                history.replace('/admin');
                localStorage.removeItem('data-cita')
            }
        }

    };


    const handleLocation = async (e) => {
        setVeterinariaId(e.target.value);

        const { data: { direccion } } = await getVeterinariaById(e.target.value)

        const res_map = await fetchMap(direccion);

        localStorage.setItem('location', JSON.stringify(res_map.features[0].center));
        setCoordenadas(res_map.features[0].center)
    };

    
    const isFormValid = () => {
        
        if (validator.isIn('', [titulo,nombre_mascota,tipo_animal,fecha_cita,hora_cita,situacion])) {

            ToastPopUp('error', 'Todos los campos son obligatorios')
            return false;
        }
        return true;

    };

    return (
        <div className="row">
            <div className="col-12">
                <p className="p-0 m-0 my-3 display-3 text-center font fw-bold">Cita de:
                    <span className="text-info fs-1 fw-normal"> {
                        (type === 'admin')
                            ? user_cita.nombre
                            : username.nombre
                    } </span>
                </p>
            </div>

            <div className="col-lg-8 col-11 mx-auto rounded p-4 bg-option">
                <p className={`
                ${(data_cita?.aceptada === 0 || data_cita?.aceptada === '0') && 'text-warning'} 
                ${(data_cita?.aceptada === 1 || data_cita?.aceptada === '1') && 'text-success'} 
                ${(data_cita?.aceptada === 2 || data_cita?.aceptada === '2') && 'text-danger'} 
                text-center fs-3 font fw-bold
                `}>{
                        (data_cita?.aceptada === 0 || data_cita?.aceptada === '0')
                            ? 'Pendiente de aceptar o rechzar'
                            : (data_cita?.aceptada === 1 || data_cita?.aceptada === '1')
                                ? 'Esta cita fue aceptada'
                                : (data_cita?.aceptada === 2 || data_cita?.aceptada === '2') && 'Esta cita fue rechazada'

                    }</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Input
                            type={"text"}
                            id={"txt01-titulo"}
                            name={"titulo"}
                            label={"Ttile:"}
                            clase={"form-control"}
                            value={titulo}
                            onChange={handleInputChange}
                            des={`${(type === 'admin') ? true : false}`}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <Input
                                    type={"text"}
                                    id={"txt01-mascota"}
                                    name={"nombre_mascota"}
                                    label={"Nombre de la mascota:"}
                                    clase={"form-control"}
                                    value={nombre_mascota}
                                    onChange={handleInputChange}
                                    des={`${(type === 'admin') ? true : false}`}
                                />
                            </div>
                            <div className="col-12 col-lg-6">
                                <Input
                                    type={"text"}
                                    id={"txt-animal"}
                                    name={"tipo_animal"}
                                    label={"Tipo de animal:"}
                                    clase={"form-control"}
                                    value={tipo_animal}
                                    onChange={handleInputChange}
                                    des={`${(type === 'admin') ? true : false}`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            {
                                (type === 'normal')
                                &&
                                <>
                                    <div className="col-12 col-lg-6">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Veterinaria (da click en el mapa):</label>
                                        {
                                            (data_cita !== -1 && bandera)
                                                ?
                                                <>
                                                    <div className="row">
                                                        <div className="col-12 fs-5 mb-2 text-center">Usted Escogio: <span className="fw-bold">{`${nameVeterinaria}`}</span></div>
                                                        <div className="col-12 mb-2 text-center">
                                                            <button
                                                                className="btn btn-info"
                                                                onClick={()=>{ setBandera(false) }}
                                                            >Click para cambiar de veterinaria</button>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <select
                                                        className="form-select"
                                                        onChange={(e) => {
                                                            handleLocation(e)
                                                        }}
                                                    >
                                                        <option defaultValue>Selecciona un valor</option>
                                                        {
                                                            listVeterinary.map(v => (
                                                                <option
                                                                    key={v.idVeterinaria}
                                                                    value={v.idVeterinaria}
                                                                >{v.veterinaria}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </>
                                        }
                                    </div>
                                </>
                            }
                            <div className={`${type === 'normal' ? 'col-12 col-lg-6' : 'col-12 col-lg-12'}`}>
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <Input
                                            type={"date"}
                                            id={"txt-fecha"}
                                            name={"fecha_cita"}
                                            label={"Fecha de la cita:"}
                                            clase={"form-control"}
                                            value={fecha_cita}
                                            onChange={handleInputChange}
                                            des={`${(type === 'admin') ? true : false}`}
                                        />
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <Input
                                            type={"time"}
                                            id={"txt-hora"}
                                            name={"hora_cita"}
                                            label={"Hora de la cita:"}
                                            clase={"form-control"}
                                            value={hora_cita}
                                            onChange={handleInputChange}
                                            des={`${(type === 'admin') ? true : false}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Situacion</label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="5"
                            name="situacion"
                            value={situacion}
                            onChange={handleInputChange}
                            disabled={(type === 'admin') ? true : false}
                        ></textarea>
                    </div>
                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            <Button
                                type={"submit"}
                                clase={`${(type === 'normal') ? ' btn btn-warning' : ' btn btn-success'} 'btn w-100 mx-1 my-2 py-3'`}
                                texto={
                                    (type === "normal" && data_cita === -1)
                                        ? 'Crear cita'
                                        : (type === "normal" && data_cita !== -1) ? 'Editar cita' : 'Aceptar cita'
                                }
                            //icono={}
                            // evento={}
                            />
                            {
                                (data_cita !== -1)
                                &&
                                <Button
                                    type={"submit"}
                                    clase={"btn btn-danger w-100 mx-1 my-2 py-3"}
                                    texto={
                                        (type === "normal" && data_cita !== -1)
                                            ? 'ELiminar cita'
                                            : 'Rechazar cita'
                                    }
                                    //icono={}
                                    evento={handleDelete}
                                />
                            }
                            <Button
                                type={"submit"}
                                clase={"btn btn-dark w-100 mx-1 my-2 py-3"}
                                texto={"Back"}
                                //icono={}
                                evento={(e) => {
                                    e.preventDefault();
                                    history.goBack();
                                    localStorage.removeItem('data-cita')
                                }}
                            />
                        </div>
                    </div>
                </form>
            </div>

            {(type === 'normal') &&
                <div className="col-4">

                    <MapaScreen coordenadas={coordenadas} />
                </div>
            }
        </div>
    )
}
