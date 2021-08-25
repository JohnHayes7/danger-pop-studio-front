import React from 'react'
import {useHistory} from 'react-router-dom'
import SignOut from '../Utilites/Signout'


const UserSignout = () =>{
    const history = useHistory()

    const logOutUser = () =>{
        // SignOut()
        localStorage.removeItem('token')
        setTimeout(()=>{
            history.push('/')
        }, 1000)
    }


    return(
        <div>
            <div><h1>Logging Out...</h1><h3>Thanks for Visiting Danger Pop</h3></div>
            {logOutUser()}
        </div>
        
    )
}

export default UserSignout