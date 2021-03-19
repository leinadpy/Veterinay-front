

const loginSuccess = (mensaje="") => {
    alertPopUp(
        "success",
        "Inicio de sesión correcto",
        mensaje,
        "animate__animated animate__bounce",
        "animate__animated animate__backOutDown",
        false,
        1500
      );
};

 const handleLogin = async (email,password) => {

    if (!isFormValid()) return;

    setDisabled(true);
    
    const res = await fetchAction(`Usuario/login/${email}&${password}`, 'POST', { email, password });

    const { exito, mensaje, data } = await res.json();

    if (exito) {

        loginSuccess();

      setTimeout(() => {
        dispatch({
          type: 'login',
          payload: {
            id: data.id_usuario,
            admin: data.isAdmin
          }
        })

        if (data.isAdmin) history.replace('/admin')
        else history.replace('/user')
        localStorage.setItem('user-login', data.id_usuario);
        localStorage.removeItem('data');

      }, 1400);
      
    } else {

      alertPopUp(
        "error",
        "Upps...",
        mensaje,
        "animate__animated animate__bounce",
        "animate__animated animate__backOutDown",
        true,
        null
      );

      setDisabled(false)
      
    }
  };