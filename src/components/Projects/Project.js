import {React, useState, useEffect} from 'react'
import Navbar from '../Nav/Navbar'
import ProjectModule from './ProjectModule'
import Field from '../InputFields/Field'
import axios from 'axios'
import Refresh from '../Utilites/Refresh'
import {useHistory} from 'react-router-dom'
import URL from '../Utilites/Url'

import './projectcss.css'

const Project = (props) => {
    const [project, setProject] = useState({})
    const [showProjectTitleForm,setShowProjectTitleForm] = useState(false)
    const [newProjectTitle, setNewProjectTitle] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const history = useHistory()
    // console.log(x.location.pathname.split('/').splice(-1)[0])
    const path = props.location.pathname
    const pageIdOne = path.split('/').splice(-1)[0]
    const pageIdTwo = path.split('/').splice(-1)[0]
    const pageId = path.split('/').splice(-1)[0] === "" ? parseInt(path.split('/').splice(-2)[0]) : parseInt(path.split('/').splice(-1)[0])

    // const URL = 'https://danger-pop-api.herokuapp.com'

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            fetch(URL + '/auto_login', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                
                setLoggedIn(true)
                const user = data.data.attributes
                setCurrentUser(user)
                checkAuth(user)
            })
        }
    }, [])

    const checkAuth = (user) =>{
        let belongsToUser = false
        if(user.id){
            belongsToUser = user.projects.filter(p => p.id === pageId).length > 0 ? true : false
            return  belongsToUser || user.administrator === true ? getProject() : notAuthorized(user)
        }
    }

    const notAuthorized = (user) =>{
        history.push(`/users/${user.id}`)
    }

    const getProject = () =>{
        console.log(pageId)
        fetch(`${URL}/projects/${pageId}`).then(response => response.json())
        .then(rxData => {
            setProject(rxData.data)
        })
    }

    

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
                    
                    {currentUser.administrator ? < ProjectModule label="Notes" project={project} /> : null} 
                    < ProjectModule label="Artist Info" project={project} />
                </div>
                <div className="col-2">
                    < ProjectModule label="User Details" project={project} />
                    < ProjectModule label="Project Images" project={project} user={currentUser} />
                </div>
                <div className="col-3">
                    < ProjectModule label="Tattoo Request" project={project} user={currentUser} /> 
                    {currentUser.administrator ? < ProjectModule label="Project Info" project={project} /> : null}
                </div>
            </div>
        )
    }

    const editProjectTitleForm = () => {
        return (
            <form>
                <Field id="title" newProjectTitle={newProjectTitle} changeHandler={e => titleInput(e)} placeholder={project.attributes.title} />
                <button className="edit-proj-title" onClick={e => updateTitle(e)}>Save</button>
                <button className="edit-proj-title" onClick={toggleTitleForm}>Cancel</button>
            </form>
        )
    }

    const updateTitle = (e) =>{
        e.preventDefault()
        
        const projectData = {
            "project_id": project.id,
            "title": newProjectTitle
        }
        
        axios({method: 'patch', url: `${URL}/projects/${project.id}`, data: projectData,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            Refresh()
          }).catch( err => {  
            console.log(err)
          })
    }

    const titleInput = (e) => setNewProjectTitle(e.target.value)

    const toggleTitleForm = () => setShowProjectTitleForm(!showProjectTitleForm)

    const displayTitleOrForm = () =>{
        
        if(showProjectTitleForm && currentUser.administrator){
            return editProjectTitleForm()
        }else{
            return  <div id="project-title">Title:{project.attributes.title }{currentUser.administrator ? <button className="edit-proj-title" onClick={toggleTitleForm}>Edit</button> : null }</div>
        }
    }


    const projectTitleDescriptionId = () =>{
        if(project.attributes){
            return(
                <div className="id-title-description">
                    
                    {displayTitleOrForm()}
                    <div id='project-description'>Description: {project.attributes.tattoo_request.description}</div>
                    <div id="project-id">Project ID# {project.id}</div>
                </div>
            )
        }
        
    }

    

 

   
    // checkAuth()
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