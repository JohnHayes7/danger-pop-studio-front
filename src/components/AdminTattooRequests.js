import {React, useState, useEffect} from 'react'
import './admintattoorequests.css'
import AdminTattooRequestDetails from './AdminTattooRequestDetails'

const AdminTattooRequests = () => {
    const [requests, setRequests] = useState([])
    const [showReqDetails, setShowReqDetails] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState([])
   
    useEffect(() => {
        fetch('http://localhost:3001/tattoo_requests').then(response => response.json())
        .then(rxData => {
           
            setRequests(rxData)
        })
    }, [] )

    // const select = (e, tr) => {
    //     e.preventDefault()
        
    // }

    const toggleShowReqDetails = (e, tr) => {
        debugger
        if(e.currentTarget.dataset.id === tr.id){
            return setShowReqDetails(!showReqDetails)
        }else{
            return showReqDetails
        }
    }
        
        
        
    


    const parseAllTattooRequests = () =>{
        
        return requests.data ? requests.data.map( tr => <div  key={tr.id} data-id={tr.id} className="tattreq-attrs" onClick={(e) => toggleShowReqDetails(e, tr)} >
                <div>
                    <div>Request ID: {tr.id}</div>
                    <div> {tr.attributes.user ? "Requestor has an account" : "Requested as a guest"}</div>
                    <div>Requestor's Email: {tr.attributes.user ? tr.attributes.user.email : tr.attributes.guest_email}</div>
                    {tr.attributes.user ? <div>Client Name: {tr.attributes.user.name}</div> : null}
                    {tr.attributes.user ? <div>Previously Tattoo Approved? {tr.attributes.user.tattoo_approved ? "Yes" : "No"}</div> : null}
                    <div>Description: {tr.attributes.description}</div>
                    < AdminTattooRequestDetails tr={tr} showReqDetails={showReqDetails}/>
                </div>
                <div><strong>{tr.attributes.approved ? "This Request has been approved" : "This Request has not yet been approved"}</strong></div>
                
                <button>Approve?</button>
        </div>) : null
        
    }

    const requestDetails = (tr) =>{
        if(showReqDetails){
            debugger
            return(
                <div >
                    <h1>Request Details</h1>
                    {tr.id}
                </div>
            )
        }
    }

    return(
        <div>
            <h1>Administrator Tattoo Requests Portal</h1>
            <div className="tattoo-request-panel">
                <div>{parseAllTattooRequests()}</div>
                
            </div>
            
        </div>
    )
}

export default AdminTattooRequests