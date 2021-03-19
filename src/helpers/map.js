import validator from "validator";
import { ToastPopUp } from "./alert";
import { fetchMap } from "./fetch";

export const location = async (direccion) => {
   
    if(validator.isEmpty(direccion)){
        ToastPopUp('error','El campo de direccion es obligatorio')
        return;
    }

    const res_map = await fetchMap(direccion);

    ToastPopUp('success','Abre las opciones debajo del mapa y selecciona')

    return res_map.features
};


export const seleccionarlugar = async (direccion) => {

    if (validator.isEmpty(direccion)) {
        ToastPopUp('error', 'elige una opcion valida selecLugar');
        return
    }

    const res_map = await fetchMap(direccion);
    
    // console.log(res_map.features[0].center)
    localStorage.setItem('location', JSON.stringify(res_map.features[0].center));

    ToastPopUp('success', 'Da click en el mapa');

    return res_map.features[0].center
};