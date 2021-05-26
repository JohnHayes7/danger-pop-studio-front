import React from 'react'

const UserProjects = (props) => {

    const parseProjects = () => {
        return (
                props.user.projects.map(p => <div>
                    <div>Title: {p.title}</div> 
                    <div>ID: {p.id}</div>
                    <div>Request ID: {p.tattoo_request_id}</div> 
                </div>)
            )
    }

    return(
        <div className="user-mod">
            <h1>Projects</h1>
            {parseProjects()}
        </div>
    )
}

export default UserProjects