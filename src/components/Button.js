import React from 'react'

export const Button = ({type="button",clase,texto,icono="", evento, des = false}) => {

    let deshabilitiar;

    if(des==='false' || !des){
        deshabilitiar= false
    }else{
        deshabilitiar= true;
    }

    return (
        <>
            <button 
                type={type} 
                className={clase}
                onClick={evento}
                disabled={deshabilitiar}
            >    
                <i className={icono}></i> 
                <span>{texto}</span>
            </button>   
        </>
    )
}
