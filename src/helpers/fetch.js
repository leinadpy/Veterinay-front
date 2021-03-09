

export const fetchAction = (endpoint, data, method='GET') => {
    
    const url = `https://localhost:5001/${endpoint}`;

    // const data = { Nombre, Telefono, Username, Password, IsAdministrador }

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json' //application/json
        },
        body: JSON.stringify(data)
    }

    if(method=== 'GET'){

        return fetch(url);
    }else{
        return fetch(url, options);
    }
}

/*
    USO:

    const res = await fetchAction('users',{name, email, password}, 'POST');
    const data = await res.json()
        

*/