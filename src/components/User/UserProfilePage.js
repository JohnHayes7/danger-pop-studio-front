import {React, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

const UserProfilePage = (props) =>{

    const [user, setUser] = useState({})
    const history = useHistory()
    const pageId = props.location.pathname.split('/')[2]
        
    useEffect(() =>{
        axios.get('http://localhost:3001/logged_in', {withCredentials: true})
        .then(response => {
                
                return response.data.user.data ? setUser(response.data.user.data.attributes) : loginAndRedirect()
        })
        .catch(error => alert('api errors', error))
    }, [])

    const loginAndRedirect = () =>{
        alert('You Must be logged in to see this page')
        history.push('/sign-in')
    }

    const isAuthorized = () =>{
        const user_id = { id: user.id }
        let authorized = false
        axios.post('http://localhost:3001/authorized', {user_id}, {withCredentials: true})
        .then(response =>{
            authorized = response.data.authorized
        })
        return authorized
    }


    const displayUserData = () =>{
        return(
            <div>
                <h1>{user.name}</h1>
            </div>
        )
       
    }


    return(
        <div>
           {displayUserData()}            
        </div>
    )
}

// const mapStateToProps = state =>{
//     return{
//         currentUser: state
//     }
// }

// export default connect(mapStateToProps)(UserProfilePage)
export default UserProfilePage