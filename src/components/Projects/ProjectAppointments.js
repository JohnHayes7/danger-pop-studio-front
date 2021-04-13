import React from 'react'

const ProjectAppointments = (props) =>{
    
    const parseAppointments = () => {
        if(props.project.attributes.appointments.length > 0){
            return props.project.attributes.appointments.map(appt => <div>{appt.date}</div>)
        }else{
            return "There are currently no upcoming appointments for this project"
        }
    }

    return(
        <div>{parseAppointments()}</div>
    )
}

export default ProjectAppointments