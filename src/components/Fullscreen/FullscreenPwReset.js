import React from 'react'
import {Link} from 'react-router-dom'

const FullscreenPwReset = () => {
    return(
        <div>
            <h3>You have successfully reset your password.  Please click <Link to="/sign-in">here</Link> to proceed</h3>
        </div>
    )
}

export default FullscreenPwReset