
export const redireccion = (history, comodin, admin, screen) => {

    (screen === 'showCard') ? redireccionShowCard(history,comodin, admin) : redireccionSettings(history, comodin, admin)

};

const redireccionSettings = (history, comodin, admin) => {
    if (comodin === 'ssa' && admin) {

        console.log('eres admin y estas en admin')

    } else if (comodin === 'ssa' && !admin) {

        console.log('NO eres admin y quieres entrar a pagina admin')
        return history.replace('/user')

    } else if (comodin !== 'ssa' && admin) {

        console.log('eres admin y quieres entrar a otro lugar')
        return history.replace('/admin')
    }

    if (comodin === 'ssn' && admin === false) {

        console.log('eres normal y estas en normal')

    } else if (comodin === 'ssn' && admin === true) {

        console.log('NO eres normal y quieres entrar a pagina normal')
        return history.replace('/admin')

    } else if (comodin !== 'ssn' && admin === false) {

        console.log('eres normal y quieres entrar a otro lugar')
        return history.replace('/user')
    }
};

const redireccionShowCard = (history,comodin, admin) => {

    if (admin === true && comodin === 'admin') {

        console.log('ok eres admin y estas en url admin')

    } else if (admin === false && comodin === 'admin') {

        return history.replace('/user') //no eres admin y quieres entrar a la url admin

    } else if (admin === false && comodin === 'normal') {

        console.log('ok eres user nomral y estas en url de user normal')

    } else if (admin === true && comodin === 'normal') {
                    
        return history.replace('/admin')  //eres admin y quieres entrar a la url user normal

    } else if (admin === true && comodin !== 'admin') {

        return history.replace('/admin')

    } else if (admin === false && comodin !== 'normal') {

        return history.replace('/user')
    }   
};