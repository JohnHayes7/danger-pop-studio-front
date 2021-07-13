import axios from 'axios'


const SignOut = () =>{
    // const history = useHistory()
    const URL = 'https://danger-pop-api.herokuapp.com/'
    axios.delete(URL + '/logout', {withCredentials: true})
    .then(response =>{
        return response.data.logged_out
    })
}

export default SignOut