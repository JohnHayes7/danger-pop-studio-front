import {React, useState, useEffect} from 'react'
import './admintattoorequests.css'

const AdminTattooRequests = () => {
    const [state, setState] = useState([])
    const [showReqDetails, setShowReqDetails] = setState(false)
   
    useEffect(() => {
        fetch('http://localhost:3001/tattoo_requests').then(response => response.json())
        .then(rxData => {
           
            setState(rxData)
        })
    }, [], showReqDetails)

    const toggleShowReqDetails = () =>{
       return setShowReqDetails(!showReqDetails)
    }


    const parseAllTattooRequests = () =>{
        
        return state.data ? state.data.map( tr => <div  key={tr.id}className="tattreq-attrs" onClick={toggleShowReqDetails()} >
            <div>Request ID: {tr.id}</div>
            <div> {tr.attributes.user ? "Requestor has an account" : "Requested as a guest"}</div>
            <div>Requestor's Email: {tr.attributes.user ? tr.attributes.user.email : tr.attributes.guest_email}</div>
            {tr.attributes.user ? <div>Client Name: {tr.attributes.user.name}</div> : null}
            {tr.attributes.user ? <div>Previously Tattoo Approved? {tr.attributes.user.tattoo_approved ? "Yes" : "No"}</div> : null}
            <div>Description: {tr.attributes.description}</div>
            <div><strong>{tr.attributes.approved ? "This Request has been approved" : "This Request has not yet been approved"}</strong></div>
        </div>) : null
    }

    const requestDetails = () =>{
        if(showReqDetails){
            return(
                <div>
                    <h1>Request Details</h1>
                </div>
            )
        }
    }

    return(
        <div>
            <h1>Administrator Tattoo Requests Portal</h1>
            <div className="tattoo-request-panel">
                <div>{parseAllTattooRequests()}</div>
                <div>{requestDetails()}</div>
            </div>
            
        </div>
    )
}

export default AdminTattooRequests