import React from 'react'

export const Input = ({type, id, name, clase ,value, onChange, label, des='false'}) => {

    let desabilitado = false;
    if(des === 'true'){
        desabilitado = true;
    }
    
    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <input 
                type={type}
                className={clase}
                id={id}
                name={name}
                onChange={onChange}
                value={value}
                disabled={desabilitado}
            />
        </>
    )
}
