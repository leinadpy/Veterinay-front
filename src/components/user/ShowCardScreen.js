import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import validator from 'validator';

import { actionCard, actionNegative } from '../../helpers/actionCard';
import { ToastPopUp } from '../../helpers/alert';

import { fetchMap } from '../../helpers/fetch';
import { getVeterinariaById } from '../../helpers/getVeterinariaById';
import { getVeterinarias } from '../../helpers/getVeterinarias';
import { useForm } from '../../hooks/useForm';
import { redireccion } from '../../routes/Redireccion';
import { Button } from '../Button';
import { Input } from '../Input';
import { MapaScreen } from '../mapa/MapaScreen';

export const ShowCardScreen = ({ history }) => {

    const { type } = useParams();
    const { admin } = JSON.parse(localStorage.getItem('user')) || -1;


    redireccion(history, type, admin, 'showCard')

    const id_usuario = localStorage.getItem('user-login') || -1;
    const data_cita = JSON.parse(sessionStorage.getItem('data-cita')) || -1;
    const user_cita = JSON.parse(sessionStorage.getItem('id-user-cita')) || -1;

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

    const { titulo, nombre_mascota, tipo_animal, fecha_cita, hora_cita, situacion } = formValues;

    const handleLocation = async (e) => {
        
        if (validator.isEmpty(e.target.value)) {
            ToastPopUp('error', 'El campo de direccion es obligatorio')
            return;
        }

        ToastPopUp('info', 'Da click en el mapa')
        setVeterinariaId(e.target.value);

        const { data: { direccion } } = await getVeterinariaById(e.target.value)
     
        const res_map = await fetchMap(direccion);
       
        sessionStorage.setItem('location', JSON.stringify(res_map.features[0].center));
        setCoordenadas(res_map.features[0].center)
    };

    useEffect(() => {
        getVeterinarias()
            .then(({ data }) => {
                setListVeterinary(data);
            })
        if (data_cita?.id_veteriniaria && type === 'normal') {
            getVeterinariaById(data_cita.id_veteriniaria)
                .then((res) => {
                    setNameVeterinaria(res.data?.veterinaria);
                    setBandera(true)
                })
        }

        return () => {
            setListVeterinary([])
            setVeterinariaId(0)
            setNameVeterinaria('')
            setCoordenadas([])
            setBandera(true)
        }

    }, [id_usuario, type, data_cita?.id_veteriniaria]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        actionCard(history, type, data_cita, bandera, id_veteriniaria, id_usuario, formValues);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        actionNegative(history, type, data_cita);
    };


    return (
        <div className="row mb-5">
            <div className="col-12">
                {
                    (type === 'admin')
                        ?
                        <p className="p-0 m-0 my-3 display-3 text-center font fw-bold">Cita de:
                            <span className="text-info fs-1 fw-normal"> {user_cita.nombre} </span>
                        </p>
                        :
                        <p className="p-0 m-0 my-3 display-3 text-center font fw-bold">Crea una cita ahora
                        </p>
                }
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
                            label={"Título de la cita:"}
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
                                                                onClick={() => { setBandera(false) }}
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
                                                        <option value="">Selecciona un valor</option>
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
                            name="Situación:"
                            value={situacion}
                            onChange={handleInputChange}
                            disabled={(type === 'admin') ? true : false}
                        ></textarea>
                    </div>
                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            <Button
                                type={"submit"}
                                clase={`${(type === 'normal') ? 'btn w-100 mx-1 my-2 py-3 btn-warning' : 'btn w-100 mx-1 my-2 py-3 btn-success'}  `}
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
                                texto={"Cancelar"}
                                //icono={}
                                evento={(e) => {
                                    e.preventDefault();
                                    history.goBack();
                                    sessionStorage.removeItem('data-cita')
                                }}
                            />
                        </div>
                    </div>
                </form>
            </div>

            {(type === 'normal') &&
                <div className={`${(type==='normal'? 'col-11 mx-auto col-lg-4 caja_mapa mb-lg-0' : 'col-12 col-lg-4 my-5 mb-lg-0 mx-auto')}`} >
                    <MapaScreen coordenadas={coordenadas} />
                </div>
            }
        </div>
    )
}
