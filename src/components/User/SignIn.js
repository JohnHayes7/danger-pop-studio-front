import {React, useState, useEffect} from 'react'
import Field from '../InputFields/Field'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../Utilites/Url'
import './signincss.css'

const SignIn = () =>{

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(null)
    
    // const URL = 'https://danger-pop-api.herokuapp.com'
    // const URL = 'http://localhost:3001'
    

    const history = useHistory()

    useEffect(() =>{
        axios.get(URL + '/logged_in', {withCredentials: true})
        .then(response => {
            setLoggedIn(response.data.logged_in)
            
        })
    }, [])

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
        axios.post(URL + '/login', {user}, {withCredentials: true})
        .then(response =>{
            debugger
            if (!response.data.errors){
                let rxdUser = response.data.user.data.attributes
                rxdUser.administrator ? history.push('/admin') : history.push(`/users/${response.data.user.data.id}`)
            }else{
                alert("Could Not Find User, Please check your login credentials or create and account")
            }
            
            
        })
        
    }  
    
    const displayForm = () =>{
        return(
            <div>
                <h1>Sign In Page</h1>
                <div className="sign-in-div">
                    <form className='sign-in-form' onSubmit={e => submitHandler(e)}>
                        <Field id='email' placeholder={'Enter Email'} userEmail={userEmail} changeHandler={e=> userEmailInput(e)} /><br></br>
                        <Field id='password' placeholder={'Enter Password'} userPassword={userPassword} changeHandler={e=> userPasswordInput(e)} />
                        <button>Sign In</button>
                    </form><br></br>
                    
                    <div>
                        <div><Link to='/password-reset'>Forgot Password</Link></div>
                        <div><Link to='/create-profile'>Create An Account</Link></div>
                    </div>
                </div>
            </div>
            
        )
    }

    

    const redirectToHomePage = () => history.push(`/`)

    debugger
    return(
        <div>
            {!loggedIn ? displayForm() : redirectToHomePage()}
        </div>
        
    )
}

export default SignIn