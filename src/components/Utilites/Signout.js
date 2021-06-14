
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const SignOut = () =>{
    // const history = useHistory()
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response =>{
        return response.data.logged_out
        // return response.data.logged_out ? history.push('/') : null
    })
}

export default SignOut