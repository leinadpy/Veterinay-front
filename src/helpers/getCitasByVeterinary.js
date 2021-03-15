import { fetchAction } from "./fetch"


export const getCitasByVeterinary = async(id_usuario) => {
    let data ={}
    
    try {
        
        let res = await fetchAction(`Lugar/${id_usuario}`);
        const {data: dataVeterinaria} = await res.json();
        const {idVeterinaria:id_veterinaria} = dataVeterinaria[0];
        
        res = await fetchAction(`Cita/veterinaria/${id_veterinaria}`);
        data = await res.json();

    } catch (error) {
        console.log('error')
    }

    return data;
}
