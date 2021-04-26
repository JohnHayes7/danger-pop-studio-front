import {React, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

const UserProfilePage = (props) =>{

    const [displayedUser, setDisplayedUser] = useState ({})
    const history = useHistory()
    const currentUserId = localStorage.cu
    const token = localStorage.tk
    const pageId = props.location.pathname.split('/')[2]
        
    debugger
    useEffect(() =>{
        if(currentUserId === pageId){
            fetch('http://localhost:3001'+props.location.pathname, {
                method: "Get",
                headers:{
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => response.json())
                .then(rxData => {
                    // debugger
                    setDisplayedUser(rxData)
                    
                })
        }else{
            alert("You must be logged in to view this page")
            localStorage.clear()
            history.push('/sign-in')
        }
    }, [])

    
    

        debugger
    return(
        
        <div>
            <h1>{displayedUser.name}</h1>
            User Profile Page
            
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        currentUser: state
    }
}

export default connect(mapStateToProps)(UserProfilePage)