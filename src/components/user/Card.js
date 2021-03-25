import React, { useEffect, useState } from 'react'
import { getVeterinariaById } from '../../helpers/getVeterinariaById';
import { getUserById } from '../../helpers/getUserById';
import { Button } from '../Button'


export const Card = ({ history, user, data }) => {

    const [veterinariaName, setVeterinaria] = useState('sin nombre');
    const [username, setUsername] = useState('sin nombre')


    // traer el nombre de la veterinaria en caso de modo_ USER NORMAL
    const id_veteri = data?.id_veteriniaria || data?.id_veterinaria;
    useEffect(() => {
        getVeterinariaById(id_veteri)
            .then(({ data: { veterinaria } }) => {

                setVeterinaria(veterinaria)
            })
    }, [id_veteri]);
    

    // traer el nombre del usuario dueño de la cita en caso de USER ADMIN
    const id_user = data?.id_usuario || data.usuario;
    useEffect(() => {
        getUserById(id_user) //TODO: Cambiar el nombre del id de usuario
            .then(({ data: { nombre } }) => {
                setUsername(nombre)
                sessionStorage.setItem('id-user-cita', JSON.stringify({id_user, nombre}));
            })
    }, [id_user]);

    const handleGoShowCard = () => {
        sessionStorage.setItem('data-cita', JSON.stringify(data));
        history.push(`/card/${user}`);
    };

    return (
        <div className="card text-center text-dark">
            <div className={`
                ${(data?.aceptada === 0 || data?.aceptada === '0' ) && 'bg-warning'} 
                ${(data?.aceptada === 1 || data?.aceptada === '1' ) && 'bg-success'} 
                ${(data?.aceptada === 2 || data?.aceptada === '2' ) && 'bg-danger'} 
                card-header
            `}>
                <p className="p-0 m-0 fw-bold">
                    {
                        (user === "admin")
                            ? `Usuario: ${username}`
                            : `Veterinaria: ${veterinariaName}`
                    }
                </p>
            </div>
            <div className="card-body">
                <h4 className="card-title">{data?.titulo}</h4>
                <h5 className="font fw-bold">{data?.nombre_mascota || data?.mascota}</h5>
                <p className="card-text">{data?.situacion || data?.sitaucion}</p>
                <Button
                    clase={`${(user === "admin" ? "btn-outline-dark" : "btn-dark")} btn w-100 py-2`}
                    texto={"Show"}
                    //icono={}
                    evento={handleGoShowCard}
                />
            </div>
            <div className="card-footer text-muted">
                <div className="row  d-flex justify-content-between align-items-center">
                    <div className="col-6 text-start">
                        <p className="p-0 m-0"><span className="fw-bold">{data?.fecha_cita || data?.fecha}</span> </p>
                    </div>
                    <div className="col-6 text-end">
                        <p className="p-0 m-0"> <span className="fw-bold">{data?.hora_cita || data?.hora}</span> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
