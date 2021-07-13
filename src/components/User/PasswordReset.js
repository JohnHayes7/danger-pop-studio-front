import React, {useState} from 'react'
import Field from '../InputFields/Field'
import axios from 'axios'

const PasswordReset = () => {

    const [userEmail, setUserEmail] = useState('')

    const userEmailInput = (e) => {
        setUserEmail(e.target.value)
    }
    
    return(
        <div>
            <h2>Danger Pop Password Reset:</h2>
            <div>Please enter your email address: <form><Field id='email' placeholder={'Enter Email'} userEmail={userEmail} changeHandler={e=> userEmailInput(e)} /></form></div>
        </div>
    )
}

export default PasswordReset