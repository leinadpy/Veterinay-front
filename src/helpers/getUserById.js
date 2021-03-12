import { fetchAction } from "./fetch";


export const getUserById = async (id = 0) => {
    let data = {};

    if (id !== 0) {
        const res = await fetchAction(`Usuario/${id}`);
        data = res.json();
    }
    return data;
};