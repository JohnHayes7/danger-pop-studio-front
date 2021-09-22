import React, {useState} from 'react'
import Field from '../InputFields/Field'
import axios from 'axios'
import ApiUrl from '../Utilites/Url'
import {useHistory} from 'react-router-dom'

const UserSetPassword = (props) => {

    const [userPassword, setUserPassword] = useState('')
    const [confirmUserPassword, setConfirmUserPassword] = useState('')
    const history = useHistory()
    const userPasswordInput = (e) => {
        setUserPassword(e.target.value)
    }

    const confirmUserPasswordInput = (e) => {
        setConfirmUserPassword(e.target.value)
    }

    const passwordMatch = () => {
        if(!!userPassword && !!confirmUserPassword){
            if(userPassword === confirmUserPassword ){
                return <button onClick={e => submitPassSet(e)} className='form-submit-button'>Submit</button>
            }else{
                return<div>Passwords Do Not Match</div>
            }
            
        }
    }

    const submitPassSet = (e) => {
        e.preventDefault()
        const user = {
            email: props.email,
            password: userPassword,
        }
        axios({method: 'put', url: ApiUrl + '/password/user_set', data: user,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            debugger
            if(!!resp.data.user){
                const user = resp.data.user
                localStorage.setItem("token", resp.data.jwt)
                history.push(`/users/${user.id}`)
                
            }

          }).catch( err => {  
            //catch the error
            console.log(err)
          })
    }

    
    return(
        <div>
            <h1>Welcome {props.email}, Please Set and confirm Your Password</h1>
            <div>
                    <form>
                        {/* <Field id="token" placeholder='Token' resetToken={resetToken} changeHandler={e=>tokenInput(e)}/> */}
                        <Field id='password' placeholder={'Enter New Password'} userPassword={userPassword} changeHandler={e=> userPasswordInput(e)} />
                        <Field id='password' placeholder={'Confirm New Password'} confirmUserPassword={confirmUserPassword} changeHandler={e=> confirmUserPasswordInput(e)} />
                    </form>
                </div>
                {passwordMatch()}
        </div>
    )
}

export default UserSetPassword