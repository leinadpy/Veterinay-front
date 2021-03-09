import React from 'react'

export const Button = ({type="button",clase,texto,icono="", evento}) => {
    return (
        <>
            <button 
                type={type} 
                className={clase}
                onClick={evento}
            >    
                <i className={icono}></i> 
                <span>{texto}</span>
            </button>   
        </>
    )
}
