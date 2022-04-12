import {React, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import './admin-style.css'
import { Link } from 'react-router-dom'
import Nav from '../Nav/Navbar'
import FullScreen from '../Fullscreen/Fullscreen'
// import CurrentUser from '../Utilites/CurrentUser'
import URL from '../Utilites/Url'

const AdminPortal = () =>{

    const [authorized, setAuthorized] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [showFullScreen, setShowFullScreen] = useState(false)
    const history = useHistory()

    useEffect(() =>{
        const token = localStorage.getItem("token")
        if(token){
            fetch(URL + '/auto_login', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                let rxdUser = data.data
                if (rxdUser.attributes.administrator){
                    setCurrentUser(rxdUser.attributes)
                    setAuthorized(true)
                }else{
                    setAuthorized(false)
                    notAuthorized()
                }
            })
        }


    }, [])

    const parseAdminCategories = () =>{
        return(
            <div>
                <Nav />
                <div className="admin-welcome">
                    <h1>Administrator Portal</h1>
                    <span className="admin-greeting">Welcome Back {currentUser.name}</span><br></br>
                    {/* <button onClick={signOutHandler}>Sign Out</button> */}
                </div>
                <div className="admin-options">
                    <div className="options-rows">
                        <Link to={'/admin/users'}>
                            <div className="option">
                                <div className="selectable-label"> Users</div>
                            </div>
                        </Link>
                        <Link to={'/admin/calendar'}>
                            <div className="option">
                                <div className="selectable-label">Calendar</div>
                            </div>
                        </Link>
                    </div>
                    <div className="options-rows">
                    <Link>
                        <div className="option" onClick={toggleFullScreenOptions}>
                            <div  className="selectable-label">Admin Site Options</div>
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

    const toggleFullScreenOptions = () => setShowFullScreen(!showFullScreen)

    const notAuthorized = () =>{
        alert('You Are Not Authorized to View This Page')
        // let user = currentUser
        history.push(`/`)
    }
    
    return(
        <div>
            {authorized ? parseAdminCategories() : "Loading..."}
            {showFullScreen ? <FullScreen type="admin-options" toggleFullScreenOptions={toggleFullScreenOptions}/>  : null}
        </div>
    )
}

export default AdminPortal