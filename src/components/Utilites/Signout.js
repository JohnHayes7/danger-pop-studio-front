import axios from 'axios'
import URL from './Url'

const SignOut = () =>{
    // const history = useHistory()
    // const URL = 'https://danger-pop-api.herokuapp.com'
   return localStorage.removeItem('token')
    // axios.delete(URL + '/logout', {withCredentials: true})
    // .then(response =>{
    //     return response.data.logged_out
    // })
}

export default SignOut