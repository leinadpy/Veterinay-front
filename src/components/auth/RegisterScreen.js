import React from 'react'
import { Redirect, useParams } from 'react-router'

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
                            <div className={`${(type === "normal")? "col-12": "col-6" } mt-2`}>
                                <label htmlFor="exampleInputPassword2" className="form-label">Email:</label>
                                <input type="text" className="form-control" id="exampleInputPassword2" />
                            </div>
                            <div className={`${(type === "normal")? "col-12": "col-6" } mt-2`}>
                                <label htmlFor="exampleInputPassword3" className="form-label">Password:</label>
                                <input type="text" className="form-control" id="exampleInputPassword3" />
                            </div>
                        </div>
                    </div>
                    {
                        (type==="admin")
                            &&
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="exampleInputPassword2" className="form-label">Name veterinary:</label>
                                        <input type="text" className="form-control" id="exampleInputPassword2" />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="exampleInputPassword3" className="form-label">Establishment address:</label>
                                        <input type="text" className="form-control" id="exampleInputPassword3" />
                                    </div>
                                </div>
                            </div>
                    }
                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            <button 
                                className="btn btn-primary w-100 mx-1 my-2 py-3"
                                // onClick={}
                            >Create now</button>
                            <button 
                                className="btn btn-primary w-100 mx-1 my-2 py-3"
                                onClick={handleBack}
                            >Back</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
