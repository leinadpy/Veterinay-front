import React from 'react'
import { Link } from 'react-router-dom'

import { fetchAction } from '../../helpers/fetch'
import { useForm } from '../../hooks/useForm'
import { Button } from '../Button'
import { Input } from '../Input'

export const LoginScreen = () => {

    const [formValues, handleInputChange, reset]=useForm({
        email: '',
        password: ''
    })

    const {email,password} = formValues;

    const handleLogin = async(e) => {
        e.preventDefault();
        reset();
        const res = await fetchAction('users',{ email, password}, 'POST');
        const data = await res.json();
        console.log(data);
    };

    return (
        <div className="row">
            <div className="col-12">
                <p className="p-0 m-0 display-1 text-center mt-5 font fw-bold">Login</p>
            </div>
            <div className="col-lg-6 col-11 mt-5 mx-auto rounded p-4 bg-option">
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        
                
                        <Input 
                            type={"text"} 
                            id={"txt01"} 
                            name={"email"}
                            label={"Email address:"} 
                            clase={"form-control"} 
                            value={email} 
                            onChange={handleInputChange} 
                        />

                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <Input 
                            type={"password"} 
                            id={"txt02"} 
                            name={"password"}
                            label={"Password:"}  
                            clase={"form-control"} 
                            value={password} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="row my-4 font">
                        <div className="col text-end">
                            <Link to="/register-type" className="text-secondary"> Create a count</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            <Button 
                                type={"submit"}
                                clase={"btn btn-primary w-100 mx-1 my-2 py-3"}
                                texto={"Login with app"}
                                //icono={} 
                            />
                            <Button 
                                type={"submit"}
                                clase={"btn btn-light w-100 mx-1 my-2 py-3 d-flex justify-content-center align-items-center"}
                                texto={"Sing in with google"}
                                icono={"fab fa-google fs-3 mx-3"} 
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
