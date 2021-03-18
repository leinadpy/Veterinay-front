import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { fetchAction } from '../../helpers/fetch';
import { getCitasByUserId } from '../../helpers/getCitasByUserId';
import { getUserById } from '../../helpers/getUserById';
import { LaodingScreen } from '../LaodingScreen';
import { Card } from './Card'

export const UserScreen = ({ history }) => {


    const { dispatch } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [urlImage, setUrlImage] = useState('./assets/person.svg');
    const [citas, setCitas] = useState([]);
    const [nombre, setNombre] = useState('')

    const usuario = JSON.parse(localStorage.getItem('user')) 
    const idUser = localStorage.getItem('user-login') || usuario.id;




    useEffect(() => {
        
        getUserById(idUser)
            .then((res) => {
                // console.log(res)
                setNombre(res.data.nombre);

                if (res?.data && res.data.imagenUrl !== 'none') {
                    setUrlImage(res.data.imagenUrl.replaceAll('*', '/'));
                }
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            })

        getCitasByUserId(idUser)
            .then((res) => {
                // console.log(res)
                setCitas(res.data)
            })


        return () => {
            setLoading(false);
        }


    }, [idUser])


    const handleGoCreateAppoitment = (e) => {
        e.preventDefault();
        //  console.log('ir a crear cita')
        history.push('/card/normal')
    };

    const handleLogout = (e) => {
        e.preventDefault();
        console.log('adios');

        setLoading(true);

        setTimeout(async () => {
            localStorage.clear();
            dispatch({
                type: 'logout'
            })
            history.replace('/login');
        }, 1000);

    };

    const handleSetting = (e) => {
        e.preventDefault();

        if (idUser) {
            fetchAction(`Usuario/${idUser}`)
                .then(res => res.json())
                .then(({ data }) => {
                    const data_user = data;

                    localStorage.setItem('data-usuario', JSON.stringify(data_user));
                    history.push('/setting/ssn')
                })

            //show settings admin
        }
    };

    if (loading) {
        return <LaodingScreen />
    }

    return (
        <>
            <div className="row p-2">
                <div className="col-2 flex">
                    <div className="imagen" style={{ backgroundImage: `url(${urlImage})` }}></div>
                </div>
                <div className="col-10">
                    <h2 className="text-center my-2 mb-4">Bienvenido <u className="fs-5 fw-bold text-warning font">{nombre}</u></h2>
                    <div className="col-12 border-bottom d-flex justify-content-between align-items-center">
                        <span className="display-5 fw-bold">Citas creadas</span>
                        <div className="d-flex flex-column">
                            <button
                                className="font btn btn-primary fs-6 mb-2"
                                onClick={handleSetting}
                            ><i className="fas fa-cog"></i> configuración</button>
                            <button
                                className="font btn btn-danger fs-6 mb-2"
                                onClick={handleLogout}
                            ><i className="fas fa-sign-out-alt"></i> cerrar sesion</button>
                        </div>
                    </div>
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
                                : citas.map(cita => (
                                    <div className="col-12 col-md-6 col-lg-4 mt-3" key={cita.id_cita}>
                                        <Card user="normal" data={cita} history={history} />
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
