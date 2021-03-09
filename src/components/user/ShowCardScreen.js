import React from 'react'

export const ShowCardScreen = ({user}) => {
    return (
        <div className="row">
            <div className="col-12">
                <p className="p-0 m-0 display-3 text-center font fw-bold">Cita de: <span className="text-info fs-1 fw-normal">Franklin</span></p>
            </div>
            <div className="col-lg-9 col-11 mx-auto rounded p-4 bg-option">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Titulo:</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <label htmlFor="exampleInputPassword1" className="form-label">Nombre de la mascota:</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" />   
                            </div>
                            <div className="col-12 col-lg-6">
                                <label htmlFor="exampleInputPassword1" className="form-label">Tipo de animal:</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" />  
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <label htmlFor="exampleInputPassword1" className="form-label">Veterinaria:</label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Fecha de la cita:</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" />  
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Hora de la cita:</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" />  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Situacion</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    </div>
                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            {
                                (user==="admin")
                                    ?
                                        <>
                                            
                                        </>   
                                    :
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
