import {React, useState} from 'react'
import ProjectAppointments from '../Projects/ProjectAppointments';
import './field.css'

const  Field = props => {

    const inputType = () =>{
        switch(props.id){
            case 'full-name': return props.fullName;
            case 'phone': return props.phone
            case 'email': return props.email;
            case 'request-text': return props.requestText;
            case 'allergies': return props.allergies;
            case 'note-text': return props.noteContent;
            case 'password': return props.userPassword;
            case 'title': return props.title
            case 'month': return props.month
            case 'day': return props.day
            case 'year': return props.year
            case 'time': return props.time
            case 'token': return props.resetToken
            case 'tr-request-decline': return props.declineText;
        }
    }

    const classType = () => {
        switch(props.id){
            case 'full-name': return 'input-field';
            case 'phone': return 'input-field'
            case 'email': return 'input-field';
            case 'password': return 'password';
            case 'request-text': return 'description-field';
            case 'allergies': return 'input-field';
            case 'note-text': return 'note-field';
            case 'title': return 'input-field'
            case 'day': return 'date-field'
            case 'month': return 'date-field'
            case 'year': return 'date-field'
            case 'time': return 'date-field'
            case 'token': return 'input-field'
            case 'tr-request-decline': return 'decription-field';
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
        }else if(classType() === 'password'){
            return(
                <div>
                    <div>
                        <label>{props.label}</label>
                    </div>
                    <div className='input-box'>
                        <input className={classType()} autoFocus={true}  placeholder={props.placeholder} type={'password'} value={inputType()} onChange={props.changeHandler} placeholder={props.placeholder}/>
                    </div>
                </div>
            )
        }
        else{
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