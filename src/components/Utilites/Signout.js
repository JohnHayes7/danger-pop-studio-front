
import axios from 'axios'

const SignOut = () =>{
    // const history = useHistory()
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response =>{
        return response.data.logged_out
        // return response.data.logged_out ? history.push('/') : alert('Something went wrong, Please try again')
    })
}

export default SignOut