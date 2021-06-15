import React from 'react'
import {useHistory} from 'react-router-dom'
import SignOut from '../Utilites/Signout'


const UserSignout = () =>{
    const history = useHistory()

    const logOutUser = () =>{
        SignOut()
        history.push('/')
    }


    return(
        <div>
            <div>Logging Out...</div>
            {logOutUser()}
        </div>
        
    )
}

export default UserSignout