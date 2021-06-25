
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const SignOut = () =>{
    // const history = useHistory()
    let signedOut = false
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response =>{
        signedOut = response.data.logged_out
        // return response.data.logged_out
        // return response.data.logged_out ? history.push('/') : null
    })
    return signedOut
}

export default SignOut