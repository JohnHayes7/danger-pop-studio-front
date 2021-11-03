import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Field from '../InputFields/Field'
import axios from 'axios'
import ApiUrl from '../Utilites/Url'
import Fullscreen from '../Fullscreen/Fullscreen'

const PasswordReset = () => {

    const [userEmail, setUserEmail] = useState('')
    const [resetToken, setResetToken] = useState('')
    const [tokenSent, setTokenSent] = useState(false)
    const [userPassword, setUserPassword] = useState('')
    const [confirmUserPassword, setConfirmUserPassword] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const userEmailInput = (e) => {
        setUserEmail(e.target.value)
    }

    const requestToken = (e) => {
        e.preventDefault()
        const emailInfo = {
            email: userEmail
        }
        axios({method: 'post', url: ApiUrl + '/password/forgot', data: emailInfo,   headers: {'Content-Type': 'application/json'}}).then(resp => {
          
            if(resp.data.status === 'ok'){
                alert('An Email has been sent to the provided address with reset instructions')
                setTokenSent(true)
            } 
            
          }).catch( err => {  
            //catch the error
            console.log(err)
          })
    }

    const tokenInput = (e) => {
        setResetToken(e.target.value)
    }

    const emailForm = () => {
        return(
            <div>
                <h2>Danger Pop Password Reset:</h2>
                <div>Please enter your email address: <form><Field id='email' placeholder={'Enter Email'} userEmail={userEmail} changeHandler={e=> userEmailInput(e)} /></form></div>
                {!!userEmail ? <button onClick={e => requestToken(e)} className='form-submit-button'>Submit</button> : null}
            </div>
        )    
    }

    const submitReset = (e) => {
        e.preventDefault()
        const userInfo = {
            email: userEmail,
            password: userPassword,
            token: resetToken
        }
        axios({method: 'post', url: ApiUrl + '/password/reset', data: userInfo,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            
            if(resp.data.status === 'ok'){
                setShowSuccessMessage(true) 
            }else if (resp.data.status === 'fail'){
                setShowErrorMessage(true)
                errorMessage()
            }else{
               return null
            }

          }).catch( err => {  
            //catch the error
            console.log(err)
          })
    }

    const successMessage = () => {
        // setUserPassword(" ")
        // setConfirmUserPassword(" ")
        // setResetToken(" ")
        return(
            <div>
                <h3>You have successfully reset your password.  Please click <Link to="/sign-in">here</Link> to proceed</h3>
            </div>
        )
    }

    const errorMessage = () => {
        return(
            <div>
                <h2>Token Error: Please ensure token is accurate.  Tokens are case sensitive.  Best practice is to copy and paste from your reset email</h2>
            </div>
        )

    }

    const userPasswordInput = (e) => {
        setUserPassword(e.target.value)
    }

    const confirmUserPasswordInput = (e) => {
        setConfirmUserPassword(e.target.value)
    }

    const passwordMatch = () => {
        if(!!userPassword && !!confirmUserPassword){
            if(userPassword === confirmUserPassword && !!resetToken){
                return <button onClick={e => submitReset(e)} className='form-submit-button'>Submit</button>
            }else{
                return<div>Passwords Do Not Match</div>
            }
            
        }
    }

    const tokenForm = () => {
        return(
            <div>
                <div>Email: {userEmail}</div>
                {showErrorMessage ? errorMessage() : null}
                <div>Please Enter Reset Token And New Password: 
                    <form>
                        <Field id="token" placeholder='Token' resetToken={resetToken} changeHandler={e=>tokenInput(e)}/>
                        <Field id='password' placeholder={'Enter New Password'} userPassword={userPassword} changeHandler={e=> userPasswordInput(e)} />
                        <Field id='password' placeholder={'Confirm New Password'} confirmUserPassword={confirmUserPassword} changeHandler={e=> confirmUserPasswordInput(e)} />
                    </form>
                </div>
                {passwordMatch()}
                {showSuccessMessage ? successMessage() : null}
                
                {/* {!!resetToken ? <button onClick={e => submitReset(e)} className='form-submit-button'>Submit</button> : null} */}
            </div>
        )
    }
    
    return(
        <div>
            {tokenSent ? tokenForm() : emailForm() }
            
        </div>
    )
}

export default PasswordReset