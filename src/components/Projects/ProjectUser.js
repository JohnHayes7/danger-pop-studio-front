import React from 'react'

const ProjectUser = (props) =>{
    debugger
    return(
        <div>
            <div>Name: {props.project.attributes.user.name || "User needs to update profile"}</div>
            <div>Email: {props.project.attributes.user.email}</div>
            <div>Phone: {props.project.attributes.user.phone_number}</div>
            <div>Allergies: {props.project.attributes.user.allergies}</div>
            <div>
                Proof Of Age: Path to image ID
            </div>
        </div> 
    )
}

export default ProjectUser