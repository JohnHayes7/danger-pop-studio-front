import {React, useEffect, useState} from 'react'

const AdminProjects = () => {
    const [state, setState] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/projects').then(response => response.json())
        .then(rxData => {
            // debugger
            setState(rxData)
        })
    }, [])

    const parseAllProjects = () =>{
        // debugger
        return state.data ? state.data.map( proj => <div  key={proj.id}className="appt-attrs">
           <div>Title: {proj.attributes.title}</div>
           <div>Request Description: {proj.attributes.tattoo_request.description}</div>
           <div>Client Name: {proj.attributes.user.name}</div>
           <div>Client Email: {proj.attributes.user.email}</div>
           <div>Client Phone: {proj.attributes.user.phone_number}</div>
           <div>Artist Name: {proj.attributes.artist.name}</div>
           <div>Artist Email: {proj.attributes.artist.email}</div>
           <div>Project Complete ? {proj.attributes.project_complete_status ? "Yes" : "No"}</div>
        </div>) : null
    }
    return(
        <div>
            <h1>Administrator Project Portal</h1>
            <div>{parseAllProjects()}</div>
        </div>
    )
}

export default AdminProjects