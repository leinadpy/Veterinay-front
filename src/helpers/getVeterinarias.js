import { ToastPopUp } from "./alert";
import { fetchAction } from "./fetch";



export const getVeterinarias = async () => {    

    let data = {}
    try {
        const res = await fetchAction('Lugar')
        data = await res.json();
        
    } catch (error) {
        
        ToastPopUp('error','Ha ocurrido un error');
    }
    
    return data;
}

