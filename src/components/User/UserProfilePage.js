import {React, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import SignOut from '../Utilites/Signout'
import UserProjects from './UserProjects'
import UserTattooRequests from './UserTattooRequests'
import UserData from './UserData'
import UserAppointments from './UserAppointments'
import Navbar from '../Nav/Navbar'
import {connect} from 'react-redux'
import axios from 'axios'
import SignIn from './SignIn'
import './userprofile.css'
import URL from '../Utilites/Url'

const UserProfilePage = (props) =>{

    const [user, setUser] = useState({})
    const [authorized, setAuthorized] = useState(false)
    const history = useHistory()
    const pageId = props.location.pathname.split('/')[2]

    // const URL = 'https://danger-pop-api.herokuapp.com'
        
    useEffect(() =>{
        // NEEDS A REFACTOR TO UTILITES
        axios.get(URL + '/logged_in', {withCredentials: true})
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
        
        axios.post(URL + '/authorized', {user_id}, {withCredentials: true})
        .then(response =>{
            
            setAuthorized(response.data.authorized)
        })
    }

    const signOutHandler = () =>{
        
        SignOut()
        history.push('/')
    }

    const displayUserData = () =>{
        return(
            <div>
                <div className="user-title">
                    <h1>{user.name}</h1>
                    <button onClick={signOutHandler}>Logout</button>
                </div>
                
                <div className='user-layout'>
                    <UserData user={user} label="data" />
                    <UserTattooRequests user={user} label="tr" />
                </div> 
                <div className='user-layout'>
                    <UserProjects user={user} label = "projects" />
                    <UserAppointments user={user} label="Appointments" />
                </div>
                
            </div>
        )
    }

    
    return(
        <div>
            <Navbar user={user} />
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