import {React, useState, useEffect} from 'react'
import './adminappointments.css'
import { ReactEmbeddedGoogleCalendar } from 'react-embedded-google-calendar';

const AdminAppointments = () =>{
    const [state, setState] = useState([])
    // useEffect(() => {
    //     fetch('http://localhost:3001/appointments').then(response => response.json())
    //     .then(rxData => {
    //         setState(rxData)
    //     })
    // }, [])

    // useEffect(() => {
    //     fetch('https://www.googleapis.com/calendar/v3/calendars/')
    // })

    

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
            <iframe src='https://calendar.google.com/calendar/embed?src=warwickcreativeservices%40gmail.com&ctz=America%2FNew_York'  width="1000" height="800" frameborder="0" scrolling="no"></iframe>
            {/* <img src="https://calendar.google.com/calendar/embed?src=warwickcreativeservices%40gmail.com&ctz=America%2FNew_York" width="1000" height="800" /> */}
            <div>{parseAllAppts()}</div>
        </div>
    )
}

export default AdminAppointments