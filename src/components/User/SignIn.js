import {React, useState} from 'react'
import Field from '../InputFields/Field'
import { Link } from 'react-router-dom'
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

    const submitHandler = (e) =>{
        e.preventDefault()
        alert('You need to build this')
    }

    

    return(
        <div>
            <h1>Sign In Page</h1>
            <div className="sign-in-div">
                <form className='sign-in-form' onSubmit={e => submitHandler(e)}>
                    <Field id='email' placeholder={'Enter Email'} userEmail={userEmail} changeHandler={e=> userEmailInput(e)} /><br></br>
                    <Field id='password' placeholder={'Enter Password'} userPassword={userPassword} changeHandler={e=> userPasswordInput(e)} />
                    <button>Sign In</button>
                </form>
            <div>
                <div>Forgot Password</div>
                <div><Link to='/create-profile'>Create An Account</Link></div>
            </div>
            </div>
            
        </div>
    )
}

export default SignIn