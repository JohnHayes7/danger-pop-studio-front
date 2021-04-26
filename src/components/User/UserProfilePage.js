import {React, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

const UserProfilePage = (props) =>{

    const [currentUser, setCurrentUser] = useState ({})
    const [loggedIn, setLoggedIn] = useState(false) 
    const history = useHistory()
    const currentUserId = localStorage.cu
    const token = localStorage.tk
    const pageId = props.location.pathname.split('/')[2]
        
    


    useEffect(() =>{
        axios.get('http://localhost:3001/logged_in', {withCredentials: true})
        .then(response => {
            if(response.data.logged_in){
                setCurrentUser(response.data.user.data)
                let x = currentUser
                debugger
               
            }else{
                alert('You must be logged in to view your account')
                history.push('/sign-in')
            }
            
        })
        .catch(error => alert('api errors', error))
       
    }, [])

    
    return(
        
        <div>
            <h1>{currentUser.attributes.name}</h1>
            User Profile Page
            
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