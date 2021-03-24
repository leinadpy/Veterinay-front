
export const redireccion = (history, comodin, admin, screen) => {

    (screen === 'showCard') ? redireccionShowCard(history,comodin, admin) : redireccionSettings(history, comodin, admin)

};

const redireccionSettings = (history, comodin, admin) => {
    if (comodin === 'ssa' && !admin) {

        // NO eres admin y quieres entrar a pagina admin
        return history.replace('/user')

    } else if (comodin !== 'ssa' && admin) {

        // eres admin y quieres entrar a otro lugar
        return history.replace('/admin')
    }

    if (comodin === 'ssn' && admin === true) {

        // NO eres normal y quieres entrar a pagina normal
        return history.replace('/admin')

    } else if (comodin !== 'ssn' && admin === false) {

        // eres normal y quieres entrar a otro lugar
        return history.replace('/user')
    }
};

const redireccionShowCard = (history,comodin, admin) => {

  if (admin === false && comodin === 'admin') {

        return history.replace('/user') //no eres admin y quieres entrar a la url admin

    } else if (admin === true && comodin === 'normal') {
                    
        return history.replace('/admin')  //eres admin y quieres entrar a la url user normal

    } else if (admin === true && comodin !== 'admin') {

        return history.replace('/admin')

    } else if (admin === false && comodin !== 'normal') {

        return history.replace('/user')
    }   
};