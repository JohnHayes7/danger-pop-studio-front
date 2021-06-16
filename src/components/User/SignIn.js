import {React, useState, useEffect} from 'react'
import Field from '../InputFields/Field'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './signincss.css'

const SignIn = () =>{

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(null)
    
    

    const history = useHistory()

    useEffect(() =>{
        axios.get('http://localhost:3001/logged_in', {withCredentials: true})
        .then(response => {
            setLoggedIn(response.data.logged_in)
            // debugger
            
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
        axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
        .then(response =>{
            debugger
            let rxdUser = response.data.user.data.attributes
            rxdUser.administrator ? history.push('/admin') : history.push(`/users/${response.data.user.data.id}`)
            
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
                    </form>
                    
                <div>
                    <div>Forgot Password</div>
                    <div><Link to='/create-profile'>Create An Account</Link></div>
                </div>
                </div>
            </div>
            
        )
    }

    

    const redirectToUserPage = () => history.push(`/`)

    debugger
    return(
        <div>
            {!loggedIn ? displayForm() : redirectToUserPage()}
        </div>
        
    )
}

export default SignIn