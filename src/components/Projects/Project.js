import {React, useState, useEffect} from 'react'
import Navbar from '../Nav/Navbar'
import ProjectModule from './ProjectModule'
import './projectcss.css'

const Project = (props) => {
    const [project, setProject] = useState({})
    
    // const [pageId, setPageId] = useState("")

    const pageId = props.location.pathname.split('/').splice(-1)

    useEffect(() => {
        // setPageId()
        fetch(`http://localhost:3001/projects/${pageId}`).then(response => response.json())
        .then(rxData => {
           
            setProject(rxData.data)
        })
    }, {})

    

    const projectModules = () =>{
        // TO DO ADD LOGIC TO DETERMINE IF USER IS A CLIENT OR ADMIN.  DISPLAY CERTAIN PROJ MODS DEPENDING ON ADMIN ACCESS
        return(
            <div >
                <h1>{project.attributes ? adminProjMods()  : null }</h1>
            </div>
        )
    }

    const adminProjMods = () => {
        
        return(
            <div className="project-modules" >
                <div className="col-1">
                    < ProjectModule label="Appointments" project={project}/>
                    < ProjectModule label="Notes" project={project} />
                    < ProjectModule label="Artist Info" project={project} />
                </div>
                <div className="col-2">
                    < ProjectModule label="User Details" project={project} />
                    < ProjectModule label="Project Images" project={project} />
                </div>
                <div className="col-3">
                    < ProjectModule label="Tattoo Request" project={project} /> 
                    < ProjectModule label="Project Info" project={project} />
                </div>
            </div>
        )
    }

    const projectTitleDescriptionId = () =>{
        if(project.attributes){
            
            return(
                <div>
                    <div id="project-title">Title:{project.attributes.title || " Please Add A Title"}</div>
                    <div id='project-description'>Description: {project.attributes.tattoo_request.description}</div>
                    <div id="project-id">Project ID# {project.id}</div>
                </div>
            )
        }
        
    }

    

 

   

    return(
        <div>
            <Navbar />
            <div className='project-data-display'>
                <h1>Danger Pop Project Page</h1>
                    {projectTitleDescriptionId()}
                <div >
                    {projectModules()}
                </div>
            </div>
        </div>
        
    )
}

export default Project