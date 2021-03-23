import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { fetchAction } from '../../helpers/fetch';
import { getCitasByVeterinary } from '../../helpers/getCitasByVeterinary';
import { getUserById } from '../../helpers/getUserById';
import { seleccionarlugar } from '../../helpers/map';
import { LaodingScreen } from '../LaodingScreen';
import { Card } from './Card';

export const AdminScreen = ({ history }) => {

    const { dispatch } = useContext(AuthContext);

    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [urlImage, setUrlImage] = useState('./assets/person.svg');
    const [name, setName] = useState('')
    const [nameLugar, setNameLugar] = useState('')

    const idUser = JSON.parse(localStorage.getItem('user')) || false

    useEffect(() => {
        if (idUser?.id?.id !== 0) {
            getUserById(idUser?.id)
                .then((res) => {

                    setName(res.data.nombre)

                    if (res.data.imagenUrl !== 'none') {
                        setUrlImage(res.data.imagenUrl.replaceAll('*', '/'));
                    }

                    fetchAction(`Lugar/${idUser?.id}`)
                        .then(res => res.json())
                        .then(({ data }) => {

                            setNameLugar(data[0].veterinaria)

                        })
                });

            getCitasByVeterinary(idUser?.id)
                .then(({ data }) => {

                    setCitas(data)

                    setTimeout(() => {
                        setLoading(false)
                    }, 1000);
                })

            return () => {
                setLoading(false);
            }
        }

    }, [idUser?.id, name]);


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

        if (idUser?.id) {
            fetchAction(`Usuario/${idUser?.id}`)
                .then(res => res.json())
                .then(({ data }) => {
                    const data_user = data;
                    if (data.isAdmin) {
                        fetchAction(`Lugar/${idUser?.id}`)
                            .then(res => res.json())
                            .then(async ({ data }) => {

                                const data_usuario = { ...data, data_user }

                                console.log(data[0].direccion);

                                seleccionarlugar(data[0].direccion);

                                localStorage.setItem('data-usuario', JSON.stringify(data_usuario));

                                history.push('/setting/ssa')
                            })
                    } else {
                        localStorage.setItem('data-usuario', JSON.stringify(data_user));
                    }

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
                <div className="col-12 col-lg-2 flex ">
                    <div className="imagen animate__animated animate__backInDown" style={{ backgroundImage: `url(${urlImage})` }}></div>
                </div>
                <div className="col-12 col-lg-10">
                    <h2 className="text-center fs-1 my-4">{nameLugar} <br /> <u className="fs-3 fw-bold text-warning font"> {`(${name})`}</u></h2>
                    <div className="col-12 border-bottom text-center">

                        <span className="display-5 fw-bold d-block mb-3">Citas agendadas</span>

                        <div className="d-flex flex-column flex-lg-row justify-content-between">
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
                <div className="col-12">
                    <div className="row contenedor_cards">
                        {
                            (citas.length === 0)
                                ?
                                <div className="col-12 d-flex text-center justify-content-center align-items-start align-items-lg-center">
                                    <h2 className="no_hay font text-warning mt-5 mt-lg-0 animate__animated animate__flipInY animate__delay-1s">No hay citas por el momento</h2>
                                </div>
                                :
                                citas.map(cita => (
                                    <div className="col-sm-12 col-md-6 col-lg-3 mt-3 animate__animated animate__fadeInUp" key={cita.id_cita}>
                                        <Card user="admin" history={history} data={cita} />
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
