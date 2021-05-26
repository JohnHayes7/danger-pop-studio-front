import React from 'react'

const UserProjects = (props) => {

    const parseProjects = () => {
        return (
                props.user.projects.map(p => <div key={p.id} className="user-request-data">
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
        debugger
    }

    return(
        <div className="user-mod">
            <h1>Projects</h1>
            {parseProjects()}
        </div>
    )
}

export default UserProjects