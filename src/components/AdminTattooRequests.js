import {React, useState, useEffect} from 'react'
import './admintattoorequests.css'

const AdminTattooRequests = () => {
    const [state, setState] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/tattoo_requests').then(response => response.json())
        .then(rxData => {
            debugger
            setState(rxData)
        })
    }, [])

    const parseAllTattooRequests = () =>{
        debugger
        return state.data ? state.data.map( tr => <div  key={tr.id}className="tattreq-attrs">
            <div>Request ID: {tr.id}</div>
            <div>Requestor's Email: {tr.attributes.user ? tr.attributes.user.email : tr.attributes.guest_email}</div>
            {tr.attributes.user ? <div>Previously Tattoo Approved? {tr.attributes.user.tattoo_approved ? "Yes" : "No"}</div> : <div>User has not been approved for a tattoo before</div>}
            {tr.attributes.user ? <div>Client Name: {tr.attributes.user.name}</div> : null}
            <div>Requestor has account? {tr.attributes.user ? "Yes" : "No"}</div>
            <div>Description: {tr.attributes.description}</div>
            <div><strong>{tr.attributes.approved ? "This Request has been approved" : "This Request has not yet been approved"}</strong></div>
        </div>) : null
    }

    return(
        <div>
            <h1>Administrator Tattoo Requests Portal</h1>
            <div>{parseAllTattooRequests()}</div>
        </div>
    )
}

export default AdminTattooRequests