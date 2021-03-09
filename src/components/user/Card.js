import React from 'react'

export const Card = () => {
    return (
        <div className="card text-center text-dark">
            <div className="card-header">
            <p className="p-0 m-0 fw-bold">Veterinary</p>
            </div>
            <div className="card-body">
                <h5 className="card-title">Titulo:</h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, ea...</p>
                <button className="btn btn-dark w-100">Show</button>
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
