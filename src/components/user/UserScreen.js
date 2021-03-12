import React, { useEffect, useState } from 'react'
import { getCitasByUserId } from '../../helpers/getCitasByUserId';
import { getUserById } from '../../helpers/getUserById';
import { LaodingScreen } from '../LaodingScreen';
import { Card } from './Card'

export const UserScreen = ({history}) => {

    const [loading, setLoading] = useState(true);
    const [urlImage, setUrlImage] = useState('./assets/person.svg');
    const [citas, setCitas] = useState([]);

    const idUser = localStorage.getItem('user-login') || 0;

    useEffect(() => {
        getUserById(idUser)
            .then((res) => {
                console.log(res)
                setUrlImage(res.data.imagenUrl.replaceAll('*', '/'));
                setLoading(false)
            })

        getCitasByUserId(idUser)
            .then((res) => {
                console.log(res)
                setCitas(res.data)
            })

    }, [idUser])


    const handleGoCreateAppoitment = (e) => {
         e.preventDefault();
         console.log('ir a crear cita')
         history.push('/card')
    };



    if (loading) {
        return <LaodingScreen/>
    }

    return (
        <>
            <div className="row p-2">
                <div className="col-2 flex">
                    <div className="imagen" style={{ backgroundImage: `url(${urlImage})` }}></div>
                </div>
                <div className="col-10">
                    <h2 className="text-end">Bienvenido <u className="fs-5 fw-bold text-warning font">Franklin Martinez Lucas</u></h2>
                    <div className="col-12 text-start display-5 fw-bold border-bottom">Citas creadas</div>
                </div>
            </div>
            <div className="row">
                <div className="col-3 flex">
                    <div 
                        className="text-center box_alt"
                        onClick={handleGoCreateAppoitment}
                    >
                        <i className="far fa-calendar-plus pointer display-1 box"></i>
                        <p className="fw-bold">Nueva cita</p>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row contenedor_cards">
                        {
                            (citas.length === 0)
                                ? <div className="col-12 d-flex justify-content-center align-items-center">
                                    <h2 className="no_hay font text-warning">No hay citas por el momento</h2>
                                </div>
                                :citas.map(card => (
                                    <div className="col-12 col-md-6 col-lg-4 mt-3" key={card}>
                                        <Card user="normal" />
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
