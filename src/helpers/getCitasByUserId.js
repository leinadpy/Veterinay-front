import { fetchAction } from "./fetch"


export const getCitasByUserId = async(id) => {
    let data = {}
    const res = await fetchAction(`Cita/usuario/${id}`);
    data = await res.json();
    return data
}
