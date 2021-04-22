import {React, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const UserProfilePage = (props) =>{

    const [displayedUser, setDisplayedUser] = useState ({})
    const history = useHistory()
    const currentUserId = localStorage.cu
    const token = localStorage.token
    const pageId = props.location.pathname.split('/')[2]
        

    useEffect(() =>{
        return getUser()
    }, [])

    const getUser = () =>{
        // IF CURRENT USER ID IS STORED IN REDUX DO I NEED LOCAL STORAGE SAVE
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
            history.push('/login')
        }
    }
    

   
    return(
        <div>
            User Profile Page
            
        </div>
    )
}

export default UserProfilePage