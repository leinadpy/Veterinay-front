import React from 'react'
import { Button } from '../Button';
import { Input } from '../Input';

export const ShowCardScreen = ({history,user}) => {


    const handleBack = (e) => {
         e.preventDefault();
         history.goBack();
         
    };

    return (
        <div className="row">
            <div className="col-12">
                <p className="p-0 m-0 display-3 text-center font fw-bold">Cita de: <span className="text-info fs-1 fw-normal">Franklin</span></p>
            </div>
            <div className="col-lg-9 col-11 mx-auto rounded p-4 bg-option">
                <form>
                    <div className="mb-3">
                        <Input 
                            type={"text"} 
                            id={"txt01-titulo"} 
                            //name={"password"}
                            label={"Ttile:"}  
                            clase={"form-control"} 
                            // value={password} 
                            // onChange={handleInputChange} 
                        />
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <Input 
                                    type={"text"} 
                                    id={"txt01-mascota"} 
                                    //name={"password"}
                                    label={"Nombre de la mascota:"}  
                                    clase={"form-control"} 
                                    // value={password} 
                                    // onChange={handleInputChange} 
                                /> 
                            </div>
                            <div className="col-12 col-lg-6">
                                <Input 
                                    type={"text"} 
                                    id={"txt-animal"} 
                                    //name={"password"}
                                    label={"Nombre de la mascota:"}  
                                    clase={"form-control"} 
                                    // value={password} 
                                    // onChange={handleInputChange} 
                                />  
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <label htmlFor="exampleInputPassword1" className="form-label">Veterinaria:</label>
                                <select className="form-select">
                                    <option defaultValue>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <Input 
                                            type={"date"} 
                                            id={"txt-fecha"} 
                                            //name={"password"}
                                            label={"Fecha de la cita:"}  
                                            clase={"form-control"} 
                                            // value={password} 
                                            // onChange={handleInputChange} 
                                        />  
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <Input 
                                            type={"time"} 
                                            id={"txt-hora"} 
                                            //name={"password"}
                                            label={"Hora de la cita:"}  
                                            clase={"form-control"} 
                                            // value={password} 
                                            // onChange={handleInputChange} 
                                        />  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Situacion</label>
                        <textarea 
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="5"
                        ></textarea>
                    </div>
                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            <Button 
                                type={"submit"}
                                clase={"btn btn-warning w-100 mx-1 my-2 py-3"}
                                texto={`${(user==="admin" ? 'Editar' : 'Aceptar')} cita`}
                                //icono={}
                                //evento={} 
                            />
                            <Button 
                                type={"submit"}
                                clase={"btn btn-danger w-100 mx-1 my-2 py-3"}
                                texto={`${(user==="admin" ? 'Eliminar' : 'Rechazar')} cita`}
                                //icono={}
                                //evento={} 
                            />
                            <Button 
                                type={"submit"}
                                clase={"btn btn-dark w-100 mx-1 my-2 py-3"}
                                texto={"Back"}
                                //icono={}
                                evento={handleBack} 
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
