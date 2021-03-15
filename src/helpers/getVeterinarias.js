import { fetchAction } from "./fetch";



export const getVeterinarias = async () => {    

    let data = {}
    try {
        const res = await fetchAction('Lugar')
        data = await res.json();
        
    } catch (error) {
        console.log(error);
    }
    
    return data;
}

