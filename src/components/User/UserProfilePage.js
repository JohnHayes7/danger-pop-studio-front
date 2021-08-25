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
       
        const token = localStorage.getItem("token")
        if(token){
            fetch(URL + '/auto_login', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                const matched = data.data.attributes.id === parseInt(pageId)
                if(data.data.type === "user" && matched){
                    const rxdUser = data.data
                    setUser(rxdUser.attributes)
                    setAuthorized(true)
                    
                }else{
                    redirectToLogin()
                }
            })
        }
    }, [])

    const redirectToLogin = () =>{
       
        alert('You Must be logged in to see this page')
        history.push('/sign-in')
    }

    // const isAuthorized = () =>{
    //     debugger
    //     if(user.id === parseInt(pageId)){
    //         setAuthorized(true) 
    //     }else{
    //         alert("You Are Not Authorized To View This Page")
            
    //     }
        
        
    // }

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