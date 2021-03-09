import React from 'react'
import { Redirect, useParams } from 'react-router'
import { Button } from '../Button';
import { Input } from '../Input';

export const RegisterScreen = ({history}) => {

    const {type} = useParams();

    if(type !== "normal" && type !== "admin"){
        return <Redirect to="/register-type"/>
    }

    const handleBack = (e) => {
         e.preventDefault();
         history.replace('/register-type');
    };

    return (
        <div className="row">
            <div className="col-12">
                <p className="p-0 m-0 display-1 text-center mt-5 font fw-bold">
                    { 
                        (type === "normal") 
                            ?"User register"
                            : "Veterinary record"
                    }
                </p>
            </div>
            <div className={`${(type === "normal")? "col-lg-6": "col-lg-9"} col-11 mt-5 mx-auto rounded p-4 bg-option`}>
                <form>
                <div className="mb-3 none">
                        <div className="row">
                            <div className={`${(type === "normal")? "col-12": "col-12 col-lg-6" } mt-2`}>
                                <Input 
                                    type={"text"} 
                                    id={"txt01"} 
                                    //name={"password"}
                                    label={"Email:"}  
                                    clase={"form-control"} 
                                    // value={password} 
                                    // onChange={handleInputChange} 
                                />
                            </div>
                            <div className={`${(type === "normal")? "col-12": "col-12 col-lg-6" } mt-2`}>
                                <Input 
                                    type={"password"} 
                                    id={"txt01_password"} 
                                    //name={"password"}
                                    label={"Password:"}  
                                    clase={"form-control"} 
                                    // value={password} 
                                    // onChange={handleInputChange} 
                                />
                            </div>
                        </div>
                    </div>
                    {
                        (type==="admin")
                            &&
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-12 col-lg-6 ">
                                        <Input 
                                            type={"text"} 
                                            id={"txt01_veterinary"} 
                                            //name={"password"}
                                            label={"Name veterinary"}  
                                            clase={"form-control"} 
                                            // value={password} 
                                            // onChange={handleInputChange} 
                                        />
                                    </div>
                                    <div className="col-12 col-lg-6 mt-2 mt-lg-0">
                                        <Input 
                                            type={"text"} 
                                            id={"txt01_address"} 
                                            //name={"password"}
                                            label={"Establishment address:"}  
                                            clase={"form-control"} 
                                            // value={password} 
                                            // onChange={handleInputChange} 
                                        />
                                    </div>
                                </div>
                            </div>
                    }
                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            <Button 
                                type={"submit"}
                                clase={"btn btn-primary w-100 mx-1 my-2 py-3"}
                                texto={"Create now"}
                                //icono={}
                                //evento={} 
                            />
                            <Button
                                type={"submit"} 
                                clase={"btn btn-primary w-100 mx-1 my-2 py-3"}
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
