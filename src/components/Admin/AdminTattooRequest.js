import {React, useState} from 'react'
import AdminTattooRequestDetails from './AdminTattooRequestDetails'

const AdminTattooRequest = props => {
    const [showReqDetails, setShowReqDetails] = useState(false)

    const toggleShowReqDetails = () => setShowReqDetails(!showReqDetails)

    const formattedDate = () => {
        let date = props.tr.attributes.created_at
        let dateAry = date.split('-')
        let day = dateAry[2].split('T')[0]
        let month = dateAry[1]
        let year = dateAry[0]
        let formatted = month + "/" + day + "/" + year

        return formatted
    }

    const approvalHander = () => {
        const req = props.tr
        req.attributes.accepted = true
        fetch('http://localhost:3001/projects',{
            method: "post",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then(resp => resp.json())
        .then(rxData => {
            console.log(rxData)
        })
    }
    
  
    return (

        <div  key={props.tr.id} data-id={props.tr.id} className="tattreq-attrs"  >
            <div onClick={toggleShowReqDetails}>
                <div>Request ID: {props.tr.id}</div>
                <div>Submitted on: {formattedDate()}</div>
                <div> {props.tr.attributes.user ? "Requestor has an account" : "Requested as a guest"}</div>
                <div>Requestor's Email: {props.tr.attributes.user ? props.tr.attributes.user.email : props.tr.attributes.guest_email}</div>
                {props.tr.attributes.user ? <div>Client Name: {props.tr.attributes.user.name}</div> : null}
                {props.tr.attributes.user ? <div>Previously Tattoo Approved? {props.tr.attributes.user.tattoo_approved ? "Yes" : "No"}</div> : null}
                <div>Description: {props.tr.attributes.description}</div>
                <br></br>
            </div>
                <AdminTattooRequestDetails key={props.tr.id} tr={props.tr} showReqDetails={showReqDetails}/>
            <br></br>
            <div><strong>{props.tr.attributes.approved ? "This Request has been approved" : "This Request has not yet been approved"}</strong></div>
            <br></br>
            <button id="approve" onClick={approvalHander}>Approve?</button> <button id='decline'>Decline?</button>
        </div>
    )
}

export default AdminTattooRequest