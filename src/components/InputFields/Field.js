import React from 'react'

const  Field = props => {
    const inputType = () =>{
        if(props.id === 'email'){
            return props.email
        }else if(props.id === 'request-text'){
            return props.requestText
        }else if(props.id === 'allergies'){
            return props.allergies
        }
    }

    
    return(
        
        <div>
            <label>{props.label}</label>
            <input type={inputType() === 'email' ? 'Email' : 'Text'} value={inputType()} onChange={props.changeHandler}/>
        </div>
    )
}

export default Field