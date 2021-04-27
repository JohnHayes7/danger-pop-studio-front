import {React, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

const UserProfilePage = (props) =>{

    const [user, setUser] = useState({})
    // const [loggedIn, setLoggedIn] = useState(false) 
    const history = useHistory()
    // const currentUserId = localStorage.cu
    // const token = localStorage.tk
    const pageId = props.location.pathname.split('/')[2]
        
    


    useEffect(() =>{
        axios.get('http://localhost:3001/logged_in', {withCredentials: true})
        .then(response => {
            
            setUser(response.data.user.data.attributes)
        })
        .catch(error => alert('api errors', error))
       
    }, [])

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