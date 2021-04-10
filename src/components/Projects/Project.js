import {React, useState, useEffect} from 'react'
import Navbar from '../Nav/Navbar'
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
        debugger
        return(
            <div >
                <h1>{project.attributes ? projectModule()  : null }</h1>
            </div>
        )
     
    }

    const projectModule = () => {
        return(
            <div className="project-modules" >
                <div>
                    <div className='proj-mod'>{project.attributes.user.name}</div>
                    <div className='proj-mod'>{project.attributes.user.name}</div>
                </div>
                <div>
                    <div className='proj-mod'>{project.attributes.user.name}</div>
               </div>
                
            </div>
            
            
        )
    }

   

    return(
        <div>
            <Navbar />
            <div className='project-data-display'>
                <h1>Danger Pop Project Page</h1>
                <div >
                    {projectModules()}
                </div>
            </div>
        </div>
        
    )
}

export default Project