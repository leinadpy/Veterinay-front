import React from 'react'

export const LaodingScreen = () => {
    return (
        <div className="loading">
            <div className="sk-cube-grid">
                <div className="sk-cube sk-cube1"></div>
                <div className="sk-cube sk-cube2"></div>
                <div className="sk-cube sk-cube3"></div>
                <div className="sk-cube sk-cube4"></div>
                <div className="sk-cube sk-cube5"></div>
                <div className="sk-cube sk-cube6"></div>
                <div className="sk-cube sk-cube7"></div>
                <div className="sk-cube sk-cube8"></div>
                <div className="sk-cube sk-cube9"></div>
            </div>
            <p className="animate__animated animate__pulse animate__slow animate__infinite fs-1">Cargando ...</p>
        </div>
    )
}
