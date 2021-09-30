import {React, useState, useEffect} from 'react'
import Field from '../InputFields/Field'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../Utilites/Url'
import UserSetPassword from './UserSetPassword'
import NavBar from '../Nav/Navbar'
import './signincss.css'

const SignIn = () =>{

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(null)
    const [initalLogin, setInitialLogin] = useState(false)
    const [displayButton, setDisplayButton] = useState(true)
   
    

    const history = useHistory()


    const displayLoading = () => {
        return <div>Signing You In...</div>
    }

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
        const user = {
            email: userEmail,
            password: userPassword
        }
        setDisplayButton(false)
        axios.post(URL + '/login', {user}, {withCredentials: true, credentials:"include"})
        .then(response =>{
            debugger
            if(!response.data.failure && response.data.user.inital_login){
                setInitialLogin(true)
            }
            else if (!response.data.failure){
                
                let rxdUser = response.data.user
                localStorage.setItem("token", response.data.jwt)

                rxdUser.administrator ? history.push('/admin') : history.push(`/users/${response.data.user.id}`)
            }else{
                setDisplayButton(true)
                alert(response.data.failure)
            }
            
            
        })
        
    }  
    
    const displayForm = () =>{
        return(
            <div>
                <NavBar />
                <h1>Sign In Page</h1>
                <div className="sign-in-div">
                    <form className='sign-in-form' onSubmit={e => submitHandler(e)}>
                        <Field id='email' placeholder={'Enter Email'} userEmail={userEmail} changeHandler={e=> userEmailInput(e)} /><br></br>
                        <Field id='password' placeholder={'Enter Password'} userPassword={userPassword} changeHandler={e=> userPasswordInput(e)} />
                        {displayButton ? <button>Sign In</button> : displayLoading()}
                    </form><br></br>
                    
                    <div>
                        <div><Link to='/password-reset'>Forgot Password</Link></div>
                        <div><Link to='/create-profile'>Create An Account</Link></div>
                    </div>
                </div>
            </div>
            
        )
    }

    const displaySetPasswordForm = () => {
       return <UserSetPassword email={userEmail} />
    }

    const displayDecider = () => {
        if(!loggedIn && initalLogin){
            return displaySetPasswordForm()
        }else{
            return displayForm()
        }
    }

    

    const redirectToHomePage = () => history.push(`/`)

    return(
        <div>
            
            {!loggedIn ? displayDecider() : redirectToHomePage()}
        </div>
        
    )
}

export default SignIn