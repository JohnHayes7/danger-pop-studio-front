import {React, useState} from 'react'
import './field.css'

const  Field = props => {

    const inputType = () =>{
        switch(props.id){
            case 'email': return props.email;
            case 'request-text': return props.requestText;
            case 'allergies': return props.allergies;
            case 'note-text': return props.noteContent;
            case 'password': return props.userPassword;
            case 'title': return props.title
            
        }
    }

    const classType = () => {
        switch(props.id){
            case 'full-name': return 'input-field';
            case 'phone': return 'input-field'
            case 'email': return 'input-field';
            case 'password': return 'input-field';
            case 'request-text': return 'description-field';
            case 'allergies': return 'input-field';
            case 'note-text': return 'note-field';
            case 'title': return 'input-field'
        }
    }

  

    const fieldGenerator = () =>{
        if(classType() === 'input-field'){
            return(
                <div>
                    <div>
                        <label>{props.label}</label>
                    </div>
                    <div className='input-box'>
                        <input className={classType()} autoFocus={true}  placeholder={props.placeholder} type={inputType() === 'email' ? 'Email' : 'Text'} value={inputType()} onChange={props.changeHandler} placeholder={props.placeholder}/>
                    </div>
                </div>
               
            )
        }else{
            return(
                <div>
                    <div>
                        <label>{props.label}</label>
                    </div>
                    <div className='input-box'>
                        <textarea className={classType()} autoFocus={true} placeholder={props.placeholder} type={inputType() === 'email' ? 'Email' : 'Text'} value={inputType()} onChange={props.changeHandler} placeholder={props.placeholder}/>
                    </div>
                </div>
            )
        }
        
    }
    
    return(

        <div className="fields">
            {fieldGenerator()}
        </div>
    )
}

export default Field