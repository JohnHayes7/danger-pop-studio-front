import {React, useState, useEffect} from 'react'
import Navbar from '../Nav/Navbar'
import ProjectModule from './ProjectModule'
import Field from '../InputFields/Field'
import axios from 'axios'
import Refresh from '../Utilites/Refresh'

import './projectcss.css'

const Project = (props) => {
    const [project, setProject] = useState({})
    const [showProjectTitleForm,setShowProjectTitleForm] = useState(false)
    const [newProjectTitle, setNewProjectTitle] = useState('')

    const pageId = props.location.pathname.split('/').splice(-1)

    useEffect(() => {
        fetch(`http://localhost:3001/projects/${pageId}`).then(response => response.json())
        .then(rxData => {
            setProject(rxData.data)
        })
    }, [])

    

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

    const editProjectTitleForm = () => {
        return (
            // <form onSubmit={e => adminProjectNoteSubmitHandler(e)}>
            //     <Field id="note-text"  noteContent={noteContent} changeHandler={e => noteInput(e)} placeholder="Add Note Here"/>
            //     <button>Save</button>
            // </form>
            <form>
                <Field id="title" newProjectTitle={newProjectTitle} changeHandler={e => titleInput(e)} placeholder={project.attributes.title} />
                <button onClick={e => updateTitle(e)}>Save</button>
            </form>
        )
    }

    const updateTitle = (e) =>{
        e.preventDefault()
        
        const projectData = {
            "project_id": project.id,
            "title": newProjectTitle
        }
        
        axios({method: 'patch', url: `http://localhost:3001/projects/${project.id}`, data: projectData,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            Refresh()
          }).catch( err => {  
            console.log(err)
          })
    }

    const titleInput = (e) => setNewProjectTitle(e.target.value)

    const toggleTitleForm = () => setShowProjectTitleForm(!showProjectTitleForm)

    const displayTitleOrForm = () =>{
        if(showProjectTitleForm){
            return editProjectTitleForm()
        }else{
            return  <div id="project-title">Title:{project.attributes.title }<button onClick={toggleTitleForm}>Edit</button></div>
        }
    }


    const projectTitleDescriptionId = () =>{
        if(project.attributes){
            
            return(
                <div className="id-title-description">
                    <div id="project-id">Project ID# {project.id}</div>
                    {displayTitleOrForm()}
                    <div id='project-description'>Description: {project.attributes.tattoo_request.description}</div>
                </div>
            )
        }
        
    }

    

 

   

    return(
        <div>
            <Navbar />
            <div className='project-data-display'>
                    {projectTitleDescriptionId()}
                <div >
                    {projectModules()}
                </div>
            </div>
        </div>
        
    )
}

export default Project