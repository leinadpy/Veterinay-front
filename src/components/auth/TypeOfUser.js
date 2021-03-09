import React from 'react'

export const TypeOfUser = ({history}) => {

    const handleTypeUser = (user) => {
         if(user ==="normal"){
            history.replace('/register/normal') 
        }else{
            history.replace('/register/admin') 
         }
    };

    return (
        <>
            <div className="row my-5">
                <div className="col-12 text-center font fs-2 border-bottom">
                    <p className="p-0 pb-2 m-0 display-5 fw-bold">What kind of user do you wanna be? </p>
                </div>
            </div>
            <div className="row my-3 flex mt-5 px-3">
                <div className="col-lg-5 col-12 mt-3 mt-lg-0 bg-option rounded text-center">
                    <img src="./assets/dog2.svg" className="w-100"  alt=""/>                   
                    <button 
                        className="btn btn-primary w-100 py-3 my-3"
                        onClick={()=> {handleTypeUser("normal")}}    
                    >Normal user</button>
                </div>
                <div className="col-lg-5 col-12 mt-3 mt-lg-0 bg-option rounded text-center">
                    <img src="./assets/dog.svg"  className="w-100" alt=""/>   
                    <button 
                        className="btn btn-primary w-100 py-3 my-3"
                        onClick={()=> {handleTypeUser("admin")}}
                  >Veterinarian</button>
                </div>
            </div>   
        </>
    )
}
