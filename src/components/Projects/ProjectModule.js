import { React, useState} from 'react'
import AdminProjectNotes from '../Admin/AdminProjectNotes'
import ProjectAppointments from './ProjectAppointments'
import ProjectUser from './ProjectUser'
import AdminProjectTattooRequest from '../Admin/AdminProjectTattooRequest'
import ProjectImageModule from './ProjectImageModule'
import AdminProjectInfoModule from '../Admin/AdminProjectInfoModule'
import AdminProjectArtistInfoModule from '../Admin/AdminProjectArtistInfo'
import './projectcss.css'

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

    const modulePicker = () =>{
        switch(props.label){
            case "Appointments":  return <div className='proj-info'>{projectAppointments()}</div>;
            case "User Details":  return <div className='proj-info'>{projectUserDetails()}</div>;
            case "Tattoo Request": return <div className='proj-info'>{projectTattooRequest()}</div>;
            case "Notes": return <div className='proj-info'>{projectNotes()}</div>;
            case "Project Images": return <div className='proj-info'>{projectImages()}</div>;
            case "Project Info": return <div className='proj-info'>{projectInfo()}</div>;
            case "Artist Info": return <div className='proj-info'>{projectArtistInfo()}</div>
        }
        
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
        
        if(moduleType()==="Tattoo Request"){
            return <AdminProjectTattooRequest label={props.label} project={props.project} user={props.user} togglePreviewImage={togglePreviewImage} imageDisplayClass={imageDisplayClass} />
        }
    }

    const projectNotes = () => {
        if(moduleType()==="Notes"){
            return <AdminProjectNotes project={props.project} />
        }
    }

    const projectImages = () =>{
        if(moduleType()==="Project Images"){
            return <ProjectImageModule label={props.label} project={props.project} user={props.user}/>
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
                <div className='proj-mod-name'>{moduleType()}:</div><br></br>
                {modulePicker()}
            </div> 
        </div>
    )
}

export default ProjectModule