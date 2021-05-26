import {React, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import SignOut from '../Utilites/Signout'
import {connect} from 'react-redux'
import axios from 'axios'
import SignIn from './SignIn'

const UserProfilePage = (props) =>{

    const [user, setUser] = useState({})
    const [authorized, setAuthorized] = useState(false)
    const history = useHistory()
    const pageId = props.location.pathname.split('/')[2]
        
    useEffect(() =>{
        // NEEDS A REFACTOR TO UTILITES
        axios.get('http://localhost:3001/logged_in', {withCredentials: true})
        .then(response => {
            
            if(response.data.user.data){
                setUser(response.data.user.data.attributes)
                isAuthorized()
            }else{
                redirectToLogin()
            }
        })
        .catch(error => redirectToLogin())
    }, [])

    const redirectToLogin = () =>{
       
        alert('You Must be logged in to see this page')
        history.push('/sign-in')
    }

    const isAuthorized = () =>{
        const user_id = { id: pageId }
        
        axios.post('http://localhost:3001/authorized', {user_id}, {withCredentials: true})
        .then(response =>{
            
            setAuthorized(response.data.authorized)
            // if(!authorized){
            //     SignOut()
            //     history.push("/sign-in")
            // }
        })
    }

    const signOutHandler = () =>{
        
        SignOut()
        history.push('/')
    }

    const displayUserData = () =>{
        return(
            <div>
                <h1>{user.name}</h1>
                <button onClick={signOutHandler}>Logout</button>
            </div>
        )
    }

    
    return(
        <div>
           {authorized ? displayUserData() : <h1>Loading...</h1>}            
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