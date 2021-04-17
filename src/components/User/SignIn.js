import {React, useState} from 'react'
import Field from '../InputFields/Field'
import './signincss.css'

const SignIn = () =>{

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const userEmailInput = (e) =>{
        e.preventDefault()
        setUserEmail(e.target.value)
    }
    const userPasswordInput = (e) =>{
        e.preventDefault()
        setUserPassword(e.target.value)
    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <div className="sign-in-div">
                <form>
                    <Field id='email' placeholder={'Enter Email'} userEmail={userEmail} changeHandler={e=> userEmailInput(e)} /><br></br>
                    <Field id='password' placeholder={'Enter Password'} userPassword={userPassword} changeHandler={e=> userPasswordInput(e)} />
                    {/* <Field id="full-name" label = 'Full Name' fullName={fullName} changeHandler={e => fullNameInput(e)} />  */}
                </form>
            </div>
            
        </div>
    )
}

export default SignIn