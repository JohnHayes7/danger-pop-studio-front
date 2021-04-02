import {React, useState, useEffect} from 'react'
import './adminappointments.css'


const AdminAppointments = () =>{
    const [state, setState] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/appointments').then(response => response.json())
        .then(rxData => {
            setState(rxData)
        })
    }, [])

    const parseAllAppts = () =>{
      
        return state.data ? state.data.map( appt => <div  key={appt.id}className="appt-attrs">
            <div>{appt.attributes.date}</div>
            <div>{appt.attributes.time}</div>
            <div>Project Name: {appt.attributes.project.title}</div>
            <div>Request Description: {appt.attributes.tattoo_request.description}</div>
            <div>Artist Name: {appt.attributes.artist.name}</div>
            <div>Artist Email: {appt.attributes.artist.email}</div>
            <div>Client Name: {appt.attributes.user.name}</div>
            <div>Client Email: {appt.attributes.user.email}</div>
        </div>) : null
    }
    return(
        <div>
            <h1>Administrator Appointment Portal</h1>
            <div>{parseAllAppts()}</div>
        </div>
    )
}

export default AdminAppointments