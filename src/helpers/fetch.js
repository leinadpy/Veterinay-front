import { ToastPopUp } from "./alert";


export const fetchAction = (endpoint, method = 'GET', data) => {

    const url_base = 'https://veterinariaservice.azurewebsites.net/';
    // const url_base = 'https://localhost:5001/';

    const url = `${url_base}/${endpoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json' //application/json
        },
        body: JSON.stringify(data)
    }

   

    if (method === 'GET') {

        return fetch(url);
    } else {
        return fetch(url, options);
    }
}

/*
    USO:

    const res = await fetchAction('users',{name, email, password}, 'POST');
    const data = await res.json()
        

*/


export const fetchMap = async (direccion) => {
    try {

        const api_key = 'sk.eyJ1IjoiZnJhbmtvMzYxIiwiYSI6ImNrbWxscnZ5dzFjYWMyb21pbnp4emlsbmgifQ.Cv9gT1mlzu_nI6h9NZGeWw';
        
        const url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direccion}.json?autocomplete=true&language=es&access_token=${api_key}`;

        const data = await fetch(url_mapbox);
        
        
        if(data.status === 401){
            
            ToastPopUp('warning', 'La API en modo gratuita no deja seleccionar este lugar, intenta con otro')
            return;    
        }
        
        const res = await data.json();

        return res;
        
    } catch (error) {
      
        return {}
    }
};