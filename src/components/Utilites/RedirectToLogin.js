import React from 'react'
import {useHistory} from 'react-router-dom'



const RedirectToLogin = () =>{
    const history = useHistory()
    return history.push('/sign-in')
} 

export default RedirectToLogin