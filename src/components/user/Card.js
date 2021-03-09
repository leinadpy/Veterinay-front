import React from 'react'
import { Button } from '../Button'

export const Card = ({user}) => {
    return (
        <div className="card text-center text-dark">
            <div className="card-header">
            <p className="p-0 m-0 fw-bold">
                {
                    (user==="admin")
                        ? "Nombre del usuario"
                        : "Nombre de la veterinaria"
                }
            </p>
            </div>
            <div className="card-body">
                <h5 className="card-title">Titulo:</h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, ea...</p>
                <Button 
                    clase={`${(user==="admin" ? "btn-outline-info" : "btn-dark") } btn w-100 py-2`}
                    texto={"Show"}
                    //icono={}
                    //evento={} 
                />
            </div>
            <div className="card-footer text-muted">
                <div className="row  d-flex justify-content-between align-items-center">
                    <div className="col-6 text-start">
                        <p className="p-0 m-0"><span className="fw-bold">30 / 12 / 12</span> </p>
                    </div>
                    <div className="col-6 text-end">
                        <p className="p-0 m-0"> <span className="fw-bold">14:20</span> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
