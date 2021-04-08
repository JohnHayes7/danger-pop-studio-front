import React from 'react'
import './field.css'

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

    const inputField = () =>{
        return(
            <div className='label-and-input' >
                <div className="label-item">
                    <label>{props.label}</label>
                </div>
                <div className='input-box'>
                    <input className='input-field' placeholder={props.placeholder} type={inputType() === 'email' ? 'Email' : 'Text'} value={inputType()} onChange={props.changeHandler} placeholder={props.placeholder}/>
                </div>
            </div>
           
        )
    }

    const textField = () => {
        return(
            <div className='label-and-input' >
                <div className="label-item">
                    <label>{props.label}</label>
                </div>
                <div className='input-box'>
                    <textarea className='description-field' placeholder={props.placeholder} type={inputType() === 'email' ? 'Email' : 'Text'} value={inputType()} onChange={props.changeHandler} placeholder={props.placeholder}/>
                </div>
            </div>
        )
    }

    
    return(

        <div className="fields">
            {props.id === 'request-text' ? textField() : inputField()}
        </div>
    )
}

export default Field