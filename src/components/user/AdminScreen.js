import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { getCitasByVeterinary } from '../../helpers/getCitasByVeterinary';
import { getUserById } from '../../helpers/getUserById';
import { LaodingScreen } from '../LaodingScreen';
import { Card } from './Card';

export const AdminScreen = ({ history }) => {

    const { dispatch } = useContext(AuthContext);

    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [urlImage, setUrlImage] = useState('./assets/person.svg');

    const idUser = localStorage.getItem('user-login') || 0;
    
    useEffect(() => {
        if(idUser!==0){
            getUserById(idUser)
            .then((res) => {
                // console.log(res)
                if (res.data.imagenUrl !== 'none') {
                    setUrlImage(res.data.imagenUrl.replaceAll('*', '/'));
                }
            });

        getCitasByVeterinary(idUser)
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

    }, [idUser]);

    const handleLogout = (e) => {
        e.preventDefault();
        console.log('adios');

        setLoading(true);

        setTimeout(async () => {
            dispatch({
                type: 'logout'
            })
            localStorage.clear();
            history.replace('/login');
        }, 1000);

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
                    <h2 className="text-center my-4"><u className="fs-3 fw-bold text-warning font">Veterinaria Pets</u></h2>
                    <div className="col-12 border-bottom d-flex justify-content-between align-items-center">
                        <span className="display-5 fw-bold">Citas agendadas</span>
                        <button
                            className="font btn btn-danger fs-6 mb-2"
                            onClick={handleLogout}
                        ><i className="fas fa-sign-out-alt"></i> cerrar sesion</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="row contenedor_cards">
                        {
                            citas.map(cita => (
                                <div className="col-sm-12 col-md-6 col-lg-3 mt-3" key={cita.id_cita}>
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
