import axios from 'axios'

const GetCurrentUser = () => {
    // let user = {}
    const URL = 'https://danger-pop-api.herokuapp.com'
        axios.get(URL + '/logged_in', {withCredentials: true})
            .then(response => {
                debugger
                return response
            })
        
}

export default GetCurrentUser
