import React from 'react'
import { Card } from './Card'

export const UserScreen = () => {

    const n = [1,2,3,4,5,6,7];

    return (
        <>
            <div className="row p-2">
                <h2 className="text-end">Bienvenido <u className="fs-5 fw-bold text-warning font">Franklin Martinez Lucas</u></h2>
                <div className="col-12 text-start display-5 fw-bold border-bottom">Citas creadas</div>
            </div>
            <div className="row">
                <div className="col-3 flex">
                    <div className="text-center box_alt">
                        <i className="far fa-calendar-plus pointer display-1 box"></i>
                        <p className="fw-bold">New appointment</p>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row contenedor_cards">
                        {
                            n.map(card=>(
                                <div className="col-4 mt-3" key={card}>
                                    <Card />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
