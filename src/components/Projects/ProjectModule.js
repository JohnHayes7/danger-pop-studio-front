import { React, useState} from 'react'

const ProjectModule = (props) =>{

    const [showPreview, setShowPreview] = useState(true)

    const imageDisplayClass = () =>{
       
        return showPreview ? "project-image-preview" : "project-image-full"
    }

    const  togglePreviewImage = () =>{
        setShowPreview(!showPreview)
    }



    
    
    const moduleType = () =>{
        return props.label
    }

    const projectAppointments = () => {
        if(moduleType()==="Appointments"){
            if( props.project.attributes.appointments.length > 0){
                return props.project.attributes.appointments.map(appt => <div>{appt.date}</div>)
            }else{
                return "There are currently no upcoming appointments for this project"
            }
        }
       
    }

    const projectUserDetails = () =>{
        if(moduleType()==="User Details"){
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
    }

    const projectTattooRequest = () =>{
        // debugger
        if(moduleType()==="Tattoo Request"){
            return(
                <div>
                    <div>Request ID: {props.project.attributes.tattoo_request.id}</div>
                    <div> Location on Body:</div>
                    <div>
                       
                        <img className={imageDisplayClass()} onClick={togglePreviewImage} src={props.project.attributes.tattoo_request.body_location_image_path} alt="body image location" />
                    </div>
                </div>
            )
        }
    }

    const projectNotes = () => {
        if(moduleType()==="Notes"){
            if(props.project.attributes.project_notes > 0){
                return (
                    <li>
                       {props.project.attributes.project_notes.map(n => <li>n.content</li> )} 
                    </li>
                    
                )
            }else{
                return <div>There are no notes for this Project</div>
            }
        }
    }


    
    return(
        <div>
            <div className='proj-mod'>
                <div>{moduleType()}:</div><br></br>
                <div className='proj-info'>{projectAppointments()}</div>
                <div className='proj-info'>{projectUserDetails()}</div>
                <div className='proj-info'>{projectTattooRequest()}</div>
                <div className='proj-info'>{projectNotes()}</div>
            </div> 
        </div>
    )
}

export default ProjectModule