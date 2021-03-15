import { fetchAction } from "./fetch"

export const getVeterinariaById = async(id_veteriniaria) => {
    let data={}

    try {
        
        const res = await fetchAction(`Lugar/veterinaria/${id_veteriniaria}`);
        data = await res.json();

    } catch (error) {
        console.log(error)
    }

    return data;
}
