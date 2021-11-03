import React from 'react'
import {useHistory} from 'react-router-dom'

const UserProjects = (props) => {

    const history = useHistory()

    const clickHandler = (e) =>{
        let id = e.currentTarget.id
        history.push(`/projects/${id}`)
    }



    const parseProjects = () => {
        return (
                props.user.projects.map(p => <div key={p.id} id={p.id} onClick={e => clickHandler(e)} className="user-request-data">
                    <div>Title: {p.title}</div> 
                    <div>ID: {p.id}</div>
                    <div>Request ID: {p.tattoo_request_id}</div> 
                    <div>Images:<div>{parseImages(p.final_images)}</div></div>
                    <div>Complete? {p.complete ? "Yes" : "No"} </div>
                </div>)
            )
    }

    const parseImages = (images) =>{
        return images.map( i => <img className="image-preview" src={i} />)
        
    }

    return(
        <div className="user-mod">
            <h1>Projects</h1>
            {parseProjects()}
        </div>
    )
}

export default UserProjects