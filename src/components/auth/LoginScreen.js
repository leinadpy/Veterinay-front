import React from 'react'
import { Link } from 'react-router-dom'

export const LoginScreen = () => {
    return (
        <div className="row">
            <div className="col-12">
                <p className="p-0 m-0 display-1 text-center mt-5 font fw-bold">Login</p>
            </div>
            <div className="col-lg-6 col-11 mt-5 mx-auto rounded p-4 bg-option">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="row my-4 font">
                        <div className="col text-end">
                            <Link to="/register-type" className="text-secondary"> Create a count</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            <button type="submit" className="btn btn-primary w-100 mx-1 my-2 py-3">Login with app</button>
                            <button type="submit" className="btn btn-light w-100 mx-1 my-2 py-3 d-flex justify-content-center align-items-center"><i className="fab fa-google fs-3"></i><span className="mx-3">Sing in with google</span></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
