

export const fetchAction = (endpoint, method = 'GET', data) => {

    const url_base = 'https://franklinveterinaria.azurewebsites.net';
    // const url_base = 'https://localhost:5001';

    const url = `${url_base}/${endpoint}`;

    // const data = { Nombre, Telefono, Username, Password, IsAdministrador }

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json' //application/json
        },
        body: JSON.stringify(data)
    }

    // console.log(url)

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
        const url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direccion}.json?autocomplete=true&language=es&access_token=pk.eyJ1IjoiZnJhbmtvMzYxIiwiYSI6ImNrbWJhbGU2dTFnbjEydm51eDY3M2c2NXEifQ.oJmUO9i2jcaLd0EpkWnhmQ`;

        const data = await fetch(url_mapbox);
        
        const res = await data.json();

        return res;
        
    } catch (error) {
        console.log(error)
        return {}
    }
};