import {React, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import './adminprojects.css'

const AdminProjects = () => {
    const [projects, setProjects] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        fetch('http://localhost:3001/projects').then(response => response.json())
        .then(rxData => {
            setProjects(rxData)
        })
    }, [])

    const artistInfo = (proj) => {
        if(proj.attributes.artist){
            return(
                <div>
                    <div>Artist Name: {proj.attributes.artist ? proj.attributes.artist.name : "TBD"}</div>
                    <div>Artist Email: {proj.attributes.artist ? proj.attributes.artist.email : "TBD"}</div>
                </div>
            )
        }else{
            return(
                <div>YOU NEED TO ASSIGN AN ARTIST TO THIS PROJECT</div>
            )
        }
    }

    const clickHandler = (e) =>{
        let id = e.currentTarget.id
        history.push(`/projects/${id}`)
    }



    const parseIncompleteProjects = () =>{
        
        return projects.data ? projects.data.map( proj => <div  key={proj.id} id={proj.id} className="proj-attrs" onClick={e => clickHandler(e)}> 
            
           <div>Title: {proj.attributes.title}</div>
           <div>Request Description: {proj.attributes.tattoo_request.description}</div>
           <div>Client Name: {proj.attributes.user.name}</div>
           <div>Client Email: {proj.attributes.user.email}</div>
           <div>Client Phone: {proj.attributes.user.phone_number}</div>
           {artistInfo(proj) }
           <div>Project Complete ? {proj.attributes.project_complete_status ? "Yes" : "No"}</div>
        </div>) : null
    }

    const parseCompleteProjects = () =>{

    
    
    }


    return(
        <div>   
            <h1>Administrator Project Portal</h1>
            <div className='all-projs'>
                <div id="incomplete-projs">
                    <h2>Incomplete Projects:</h2>
                    <div>{parseIncompleteProjects()}</div>
                </div>
                <div id='complete-projs'>
                    <h2>Complete Projects:</h2>
                    <div>{parseCompleteProjects()}</div>
                </div>
            
             </div>
        </div>
        
    )
}

export default AdminProjects