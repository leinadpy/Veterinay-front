
// const user = {
//     id_usuario: 34,
//     nombre: "Franklin Martinez Lucas",
//     email: "correo@correo.com",
//     password: "*****",
//     telefono: "none",
//     isAdmin: true,
//     isAuthGoogle: true,
//     imagenUrl: "none",
//     logged: false
// }

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...action.payload,
                logged: true
            }
        case 'logout':
            return {
                logged: false
            }
        default:
            return state;
    }
};