import { useState } from 'react';


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    // const handleValidation = ({target}) => {
    //      if(target.value.trim() === ""){
    //         target.classList.remove('border-success')
    //         target.classList.add('border-danger', 'border', 'border-3')
    //         return true;

    //      }else{
    //         target.classList.remove('border-danger')
    //         target.classList.add('border-success', 'border', 'border-3')
    //         return false;
    //      }
    // };

    return [ values, handleInputChange, reset ];

}

/* 
ejemplo de uso:

    const initialForm = {
        name: '',
        age: 0,
        email: ''
    };
    
    const [ formValues, handleInputChange, reset ] = useForm( initialForm );
*/