import React from 'react'

const UserTattooRequests = (props) => {

    const parseRequests = () =>{
        return props.user.tattoo_requests.map(tr => <div key={tr.id} className="user-request-data"><div>ID:{tr.id}</div> <div>Description:{tr.description}</div><div>Status:{tr.accepted ? "Accepted" : "Pending"}</div><br></br></div> )
    }
    
    return(
        <div className={'user-mod'}>
            <h1>Tattoo Requests</h1>
            {parseRequests()}
        </div>
    )
}

export default UserTattooRequests