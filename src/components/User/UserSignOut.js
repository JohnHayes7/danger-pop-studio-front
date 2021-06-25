import React from 'react'
import {useHistory} from 'react-router-dom'
import SignOut from '../Utilites/Signout'


const UserSignout = () =>{
    const history = useHistory()

    const logOutUser = () =>{
        SignOut()
        setTimeout(()=>{
            history.push('/')
        }, 1000)
    }


    return(
        <div>
            <div>Logging Out...</div>
            {logOutUser()}
        </div>
        
    )
}

export default UserSignout