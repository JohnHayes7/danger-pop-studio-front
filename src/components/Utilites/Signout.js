import axios from 'axios'


const SignOut = () =>{
    // const history = useHistory()
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response =>{
        return response.data.logged_out
    })
}

export default SignOut