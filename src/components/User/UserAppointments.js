import React from 'react'

const UserAppointments = (props) =>{

    const parseAppts = () =>{
        return props.user.appointments.map(appt => <div className="user-request-data"> <div>Date: {appt.date}</div> <div>Time: {appt.time}{appt.daypart}</div> <div>Estimated Length:{appt.length_time}</div> </div>)
        
    }

    return(
        <div className="user-mod">
            <h1>{props.label}</h1>
            {parseAppts()}
        </div>
    )
}

export default UserAppointments