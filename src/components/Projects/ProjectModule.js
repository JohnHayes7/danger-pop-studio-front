import { React, useState} from 'react'
import AdminProjectNotes from '../Admin/AdminProjectNotes'
import ProjectAppointments from './ProjectAppointments'
import ProjectUser from './ProjectUser'
import AdminProjectTattooRequest from '../Admin/AdminProjectTattooRequest'
import ProjectImageModule from './ProjectImageModule'
import AdminProjectInfoModule from '../Admin/AdminProjectInfoModule'
import AdminProjectArtistInfoModule from '../Admin/AdminProjectArtistInfo'

const ProjectModule = (props) =>{

    const [showPreview, setShowPreview] = useState(true)

    const imageDisplayClass = () =>{
       
        return showPreview ? "project-image-preview" : "project-image-full"
    }

    const  togglePreviewImage = () =>{
        setShowPreview(!showPreview)
    }

    const moduleType = () =>{
        // CAN COMPONENTS BE DYNAMICALLY NAMED?
        return props.label
    }

    const projectAppointments = () => {
        if(moduleType()==="Appointments"){
           return <ProjectAppointments label={props.label} project={props.project} />
        }  
    }

    const projectUserDetails = () =>{
        if(moduleType()==="User Details"){
           return <ProjectUser label={props.label} project={props.project} />
        }
    }

    const projectTattooRequest = () =>{
        // debugger
        if(moduleType()==="Tattoo Request"){
            return <AdminProjectTattooRequest label={props.label} project={props.project} togglePreviewImage={togglePreviewImage} imageDisplayClass={imageDisplayClass} />
        }
    }

    const projectNotes = () => {
        if(moduleType()==="Notes"){
            return <AdminProjectNotes project={props.project} />
        }
    }

    const projectImages = () =>{
        if(moduleType()==="Project Images"){
            return <ProjectImageModule label={props.label} project={props.project}/>
        }
    }

    const projectInfo = () => {
        if(moduleType()==="Project Info"){
             return <AdminProjectInfoModule label={props.label} project={props.project} />
        }
    }

    const projectArtistInfo = () =>{
        if(moduleType()==='Artist Info'){
            return <AdminProjectArtistInfoModule label={props.label} project={props.project}/>
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
                <div className='proj-info'>{projectImages()}</div>
                <div className='proj-info'>{projectInfo()}</div>
                <div className='proj-info'>{projectArtistInfo()}</div>
                

            </div> 
        </div>
    )
}

export default ProjectModule