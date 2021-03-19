import React, { useEffect, useState } from 'react'
import { Input } from '../Input'
// import { fetchAction } from '../../helpers/fetch'
import { useForm } from '../../hooks/useForm'
import { MapaScreen } from '../mapa/MapaScreen'
import { useParams } from 'react-router'
import { fetchAction } from '../../helpers/fetch'
import { alertPopUp, ToastPopUp } from '../../helpers/alert'
import Swal from 'sweetalert2'
import validator from 'validator'


export const SettingsScreen = ({ history }) => {

    const { setting } = useParams();
    // const id_usuario = localStorage.getItem('user-login') || false;
    const data_usuario = JSON.parse(localStorage.getItem('data-usuario')) || false;

    const {admin} = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if( setting ==='ssa' && admin ){

            console.log('eres admin y estas en admin')
            
        }else if(setting === 'ssa' && !admin){
    
            console.log('NO eres admin y quieres entrar a pagina admin')
            return history.replace('/user')
    
        }else if(setting !== 'ssa' && admin){
    
            console.log('eres admin y quieres entrar a otro lugar')
            return history.replace('/admin')
        }
    
        if( setting ==='ssn' && admin===false ){
    
            console.log('eres normal y estas en normal')
            
        }else if(setting === 'ssn' && admin === true){
    
            console.log('NO eres normal y quieres entrar a pagina normal')
            return history.replace('/admin')
    
        }else if(setting !== 'ssn' && admin===false){
    
            console.log('eres normal y quieres entrar a otro lugar')
            return history.replace('/user')
        }
    }, [setting, admin, history])
    

    const [lugares, setLugares] = useState([])
    const [coordenadas, setCoordenadas] = useState([])
    const [bandera, setBandera] = useState(false);


    const [formValues, handleInputChange] = useForm({
        nombre: data_usuario.data_user?.nombre || data_usuario.nombre || '',
        password: data_usuario.data_user?.password || data_usuario.password || '',
        email: data_usuario.data_user?.email || data_usuario.email || '',
        telefono: (data_usuario.data_user?.telefono === 'none'  || data_usuario.telefono === 'none') ? '' : data_usuario?.data_user?.telefono || data_usuario?.telefono,
        veterinaria: data_usuario[0]?.veterinaria || '',
        direccion: data_usuario[0]?.direccion || ''
    })      
    
    const { nombre,
        password,
        email,
        telefono,
        veterinaria,
        direccion } = formValues;


    const [direccionVeteriniaria, setDireccionVeteriniaria] = useState(direccion);

    const seleccionarlugar = async (e) => {

        if(validator.isEmpty(e.target.value)){
            ToastPopUp('error','El campo de direccion es obligatorio')
            return;
        }

        setDireccionVeteriniaria(e.target.value)

        const url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?autocomplete=true&language=es&access_token=pk.eyJ1IjoiZnJhbmtvMzYxIiwiYSI6ImNrbWJhbGU2dTFnbjEydm51eDY3M2c2NXEifQ.oJmUO9i2jcaLd0EpkWnhmQ`;

        const data = await fetch(url_mapbox);
        const res = await data.json();

        
        localStorage.setItem('location', JSON.stringify(res.features[0].center));
        setCoordenadas(res.features[0].center)
        console.log(coordenadas)
    };


    const location = async () => {

        if(validator.isEmpty(direccion)){
            ToastPopUp('error','El campo de direccion es obligatorio')
            return;
        }


        const url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direccion}.json?autocomplete=true&language=es&access_token=pk.eyJ1IjoiZnJhbmtvMzYxIiwiYSI6ImNrbWJhbGU2dTFnbjEydm51eDY3M2c2NXEifQ.oJmUO9i2jcaLd0EpkWnhmQ`;

        const data = await fetch(url_mapbox);
        const res = await data.json();
        setLugares(res.features);
        setBandera(true)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Abre las opciones debajo del mapa y selecciona'
        })
    };

    const handleUpdateInfo = async(e) => {
        e.preventDefault();

        const tel = (telefono.trim()=== '') ? 'none' :  telefono.trim();
    
        if (data_usuario?.data_user?.isAdmin) {

            const google= data_usuario?.data_user?.isAuthGoogle||data_usuario?.isAuthGoogle;
            console.log(google)
            if(!isFormValid(google, true)){
                return;
            }
  
            const id_usuario = data_usuario.data_user.id_usuario;
            
            const id_veteriniaria = data_usuario[0].idVeterinaria;

            const res_user = await fetchAction(`Usuario/admin/${id_usuario}&${nombre}&${tel}`, 'PUT', {
                id_usuario,
                nombre,
                telefono:tel
            })

            const data_user = await res_user.json();

            const res_lugar = await fetchAction(`Lugar/${id_veteriniaria}`, 'PUT', {
                id_veteriniaria,
                nombre_veterinaria: veterinaria,
                direccion : direccionVeteriniaria,
                id_usuario
            });

            const data_lugar = await res_lugar.json();

            // const dataUsuario = {data_lugar,data_user}
            // console.log(dataUsuario)

            
            if(data_lugar.exito && data_user.exito){
                
                localStorage.setItem('data-usuario', '');

                alertPopUp(
                    "success",
                    "Actualizacion completa",
                    data_user.mensaje,
                    "animate__animated animate__bounce",
                    "animate__animated animate__backOutDown",
                    false,
                    1500
                  );
                
                  setTimeout(() => {
                    history.replace('/admin')
                  }, 1450);
            }

            
        }
        else{

            const google= data_usuario?.data_user?.isAuthGoogle||data_usuario?.isAuthGoogle;

            if(!isFormValid(google, false)){
                return;
            }

            const id_usuario = data_usuario.id_usuario;
        
            const res_user = await fetchAction(`Usuario/normal/${id_usuario}&${nombre}&${tel}&${email}&${password}`, 'PUT', {
                id_usuario,
                nombre,
                password,
                email,
                telefono:tel
            });

            const data_user = await res_user.json();
            
            if(data_user?.exito){
                
                localStorage.setItem('data-usuario', '');

                alertPopUp(
                    "success",
                    "Actualizacion completa",
                    data_user.mensaje,
                    "animate__animated animate__bounce",
                    "animate__animated animate__backOutDown",
                    false,
                    1500
                  );
                
                  setTimeout(() => {
                    history.replace('/user')
                  }, 1450);
            }
        }
    };

    const isFormValid = (google, admin) => {
        
        if(google){ //usuario Google
            if(validator.isEmpty(nombre)){
                ToastPopUp('error', 'El campo nombre es requerido')
                return false;
            }
            if(admin){
                if(validator.isEmpty(data_usuario[0].idVeterinaria) || validator.isEmpty(veterinaria) || !data_usuario[0].idVeterinaria ){
                    ToastPopUp('error', 'Los datos de la veterinaria son obligatorios')
                    return false;
                 } 
                   
            }
            
        }
       else{ //usuario NO google
            if (validator.isIn('', [nombre, email, password])) {
                ToastPopUp('error', 'Todos los campos son obligatorios')
                return false;
            }
            if(admin){
             if(validator.isEmpty(data_usuario[0].idVeterinaria) || !data_usuario[0].idVeterinaria){
                ToastPopUp('error', 'Los datos de la veterinaria son obligatorios')
                return false;
             }   
            }
        }

        return true;
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
                            ( (data_usuario?.isAuthGoogle === false) )
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
                            ( (data_usuario?.isAuthGoogle=== false))
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
                                        <select className="form-select" onChange={seleccionarlugar}>
                                            <option >Despliga estas opciones</option>
                                            {
                                                lugares.map(l => (
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
                                    onClick={location}
                                >Actualizar direccion</button>
                                <span className="mx-3">(presiona este boton para buscar)</span>
                            </div>
                        </div>
                    }

                    <div className="row mt-5">
                        <div className="col-6">
                            {/* <button className="btn btn-info py-3 w-100">Aceptar</button> */}
                        </div>
                        <div className="col-6">
                            {/* <button className="btn btn-danger py-3 w-100">Cancelar</button> */}
                        </div>
                    </div>
                    <button
                        className="btn btn-success w-100 py-3"
                        onClick={handleUpdateInfo}
                    >Actualizar informacion</button>
                </div>
                <div className="col-6">
                    {
                        (setting === 'ssa')
                        &&
                        <MapaScreen coordenadas={coordenadas} />
                    }
                </div>
            </div>


        </div>
    )
}
