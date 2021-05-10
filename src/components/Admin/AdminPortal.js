import {React, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import './admin-style.css'
import { Link } from 'react-router-dom'
import SignOut from '../Utilites/Signout'

const AdminPortal = () =>{

    const [authorized, setAuthorized] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const history = useHistory()

    useEffect(() =>{
        axios.get('http://localhost:3001/logged_in', {withCredentials: true})
        .then(response => {
            if (response.data.logged_in){
                if(response.data.user.data.attributes.administrator){
                    setAuthorized(response.data.user.data.attributes.administrator)
                    setCurrentUser(response.data.user.data.attributes)
                }else{
                    notAuthorized()
                }
            }else{
                notAuthorized()
            }
           
        })
        // .catch(error => alert('Error Will Robinson'))
    }, [])

    const parseAdminCategories = () =>{
        return(
            <div>
                <div className="admin-welcome">
                    <h1>Administrator Portal</h1>
                    <span className="admin-greeting">Welcome Back {currentUser.name}</span><br></br>
                    <button onClick={signOutHandler}>Sign Out</button>
                </div>
                <div className="admin-options">
                    <div className="options-rows">
                        <Link to={'/admin/users'}>
                            <div className="option">
                                <div className="selectable-label"> Users</div>
                            </div>
                        </Link>
                        <Link to={'/admin/appts'}>
                            <div className="option">
                                <div className="selectable-label">Appointments</div>
                            </div>
                        </Link>
                    </div>
                    <div className="options-rows">
                        <Link to={'/admin/projects'}>
                            <div className="option">
                                <div className="selectable-label">Projects</div>
                            </div>
                        </Link>
                        <Link to={'/admin/tattoo-requests'}>
                            <div className="option">
                                <div className="selectable-label">Tattoo Requests</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const signOutHandler = () =>{
        SignOut()
        history.push('/')
    }

    const notAuthorized = () =>{
        alert('You Are Not Authorized to View This Page')
        history.push('/sign-in')
    }
    
    return(
        <div>
            {authorized ? parseAdminCategories() : "Loading..."}
        </div>
    )
}

export default AdminPortal