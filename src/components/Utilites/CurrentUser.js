import axios from 'axios'

const GetCurrentUser = () => {
    // let user = {}
        axios.get('http://localhost:3001/logged_in', {withCredentials: true})
            .then(response => {
                debugger
                return response
            })
        
}

export default GetCurrentUser
