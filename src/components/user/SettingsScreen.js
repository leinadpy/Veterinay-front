import React, { useEffect, useState } from 'react'
import { Input } from '../Input'
import { useForm } from '../../hooks/useForm'
import { MapaScreen } from '../mapa/MapaScreen'
import { useParams } from 'react-router'
import {redireccion} from '../../routes/Redireccion'
import { location, seleccionarlugar } from '../../helpers/map'
import { updateUser } from '../../helpers/updateUser'


export const SettingsScreen = ({ history }) => {

    const { setting } = useParams();

    const data_usuario = JSON.parse(localStorage.getItem('data-usuario')) || false;

    const { admin } = JSON.parse(localStorage.getItem('user'))

    redireccion(history, setting, admin, 'settingScreen');


    const [lugares, setLugares] = useState([])
    const [coordenadas, setCoordenadas] = useState([])
    const [bandera, setBandera] = useState(false);

    const [formValues, handleInputChange] = useForm({
        nombre: data_usuario.data_user?.nombre || data_usuario.nombre || '',
        password: data_usuario.data_user?.password || data_usuario.password || '',
        email: data_usuario.data_user?.email || data_usuario.email || '',
        telefono: (data_usuario.data_user?.telefono === 'none' || data_usuario.telefono === 'none') ? '' : data_usuario?.data_user?.telefono || data_usuario?.telefono,
        veterinaria: data_usuario[0]?.veterinaria || '',
        direccion: data_usuario[0]?.direccion || ''
    })

    const { nombre, password, email, telefono, veterinaria, direccion } = formValues;

    const [direccionVeteriniaria, setDireccionVeteriniaria] = useState(direccion);

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        updateUser(history, data_usuario, direccionVeteriniaria, formValues);
    };

    return (
        <div className="">
            <div className="row">
                <div className="col 12 text-center fs-1 font mt-4">Configuración de datos</div>
            </div>
            <div className="row mt-5">
                <div className={`${(setting === 'ssa') ? 'col-6' : 'col-8 mx-auto'}`}>
                    <div className="mt-3 fs-5">
                        <Input
                            type={"text"}
                            id={"txt01"}
                            name={"nombre"}
                            label={"Nombre:"}
                            clase={"form-control"}
                            value={nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-3 fs-5">
                        {
                            ((data_usuario?.isAuthGoogle === false))
                            &&
                            <Input
                                type={"password"}
                                id={"txt02"}
                                name={"password"}
                                label={"Password:"}
                                clase={"form-control"}
                                value={password}
                                onChange={handleInputChange}
                            />
                        }
                    </div>
                    <div className="mt-3 fs-5">
                        {
                            ((data_usuario?.isAuthGoogle === false))
                            &&
                            <Input
                                type={"text"}
                                id={"txt03"}
                                name={"email"}
                                label={"Email"}
                                clase={"form-control"}
                                value={email}
                                onChange={handleInputChange}
                            />
                        }
                    </div>
                    <div className="mt-3 fs-5">

                        <Input
                            type={"number"}
                            id={"txt04"}
                            name={"telefono"}
                            label={"Telefono:"}
                            clase={"form-control"}
                            value={telefono}
                            onChange={handleInputChange}
                        />
                    </div>
                    {
                        (setting === 'ssa')
                        &&
                        <div className="row">
                            <div className="col-12">
                                <div className="mt-3 fs-5">

                                    <Input
                                        type={"text"}
                                        id={"txt05"}
                                        name={"veterinaria"}
                                        label={"Veterinaria:"}
                                        clase={"form-control"}
                                        value={veterinaria}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                {
                                    (!bandera)
                                        ?
                                        <>
                                            <p className="mt-4 fs-5">Direccion escogida: <span className="fw-bold text-warning">{direccion}</span></p>
                                        </>
                                        :
                                        <div className="mt-3 fs-5">
                                            <Input
                                                type={"text"}
                                                id={"txt06"}
                                                name={"direccion"}
                                                label={"Direccion:"}
                                                clase={"form-control"}
                                                value={direccion}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                }
                            </div>
                            {
                                (bandera)
                                &&
                                <div className="col-6">
                                    <div className="mt-3 fs-5">
                                        <label htmlFor="" className="form-label">Lugar</label>
                                        <select className="form-select" onChange={async (e) => {

                                            setDireccionVeteriniaria(e.target.value)
                                            const res_map = await seleccionarlugar(e.target.value);
                                            setCoordenadas(res_map)

                                        }}>
                                            <option >Despliga estas opciones</option>
                                            {
                                                (lugares) && lugares.map(l => (
                                                    <option key={l.id} value={l.place_name_es} >{l.place_name_es}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            }
                            <div className="col-12 text-start ">
                                <button
                                    className="btn btn-info mt-2"
                                    onClick={async () => {

                                        const res_map = await location(direccion);
                                        setLugares(res_map);
                                        setBandera(true)

                                    }}
                                >Actualizar direccion</button>
                                <span className="mx-3">(presiona este boton para buscar)</span>
                            </div>
                        </div>
                    }

                    <button
                        className={`${(setting==='ssn' ? 'mt-5' : 'mt-2' )} btn btn-success w-100 py-3`}
                        onClick={handleUpdateInfo}
                    >Actualizar informacion</button>
                </div>
                <div className="col-6">
                    {
                        (setting === 'ssa') && <MapaScreen coordenadas={coordenadas} />
                    }
                </div>
            </div>


        </div>
    )
}
