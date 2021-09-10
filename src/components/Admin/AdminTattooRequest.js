import {React, useState} from 'react'
import AdminTattooRequestDetails from './AdminTattooRequestDetails'
import Field from '../InputFields/Field'
import Refresh from '../Utilites/Refresh'
import axios from 'axios'
import URL from '../Utilites/Url'

const AdminTattooRequest = props => {
    const [showReqDetails, setShowReqDetails] = useState(false)
    const [requestCanDisplay, setRequestCanDisplay] = useState(true)
    const [declineConfirmationCanDisplay, setDeclineConfirmationCanDisplay] = useState(false)
    const [declineExplanationCanDisplay, setDeclneExplanationCanDisplay] = useState(false)
    const [showApproved, setShowApproved] = useState(true)
    const [explanationText, setExplanationText] = useState(" ")

    const toggleShowReqDetails = () => setShowReqDetails(!showReqDetails)
    

    // const URL = "https://danger-pop-api.herokuapp.com"

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
        fetch(URL + '/projects',{
            method: "post",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then(resp => resp.json())
        .then(rxData => {
            if(rxData.data.type === "projects"){
                Refresh()
            }else{
                alert('BACKEND ERROR NOTIFY SYSTEM ADMINISTRATOR')
            }
        })
    }

    const backupHandler = () =>{
        const req = props.tr
        const data = {
            tattoo_request:{
                backup: true
            }
        }
        axios({method: 'put', url: `${URL}/tattoo_requests/${req.id}`, data: data ,   headers: {'Content-Type': 'application/json'}}).then(resp => {  
            console.log(resp)
            if(resp.statusText === "OK"){
                Refresh()
            }else{
                alert('Unable to Save as Backup, Please contact system admin')
            }
            
          }).catch( err => {  
            console.log(err)
          })  
    }

    const declineHandler = () => {
        // debugger
        setRequestCanDisplay(false)
        setDeclineConfirmationCanDisplay(true)
        
        
    }

    

    const displayDecisionButtons = () => {
        if(!props.tr.attributes.accepted)
        return(
            <div>
                <button id="approve" onClick={approvalHander}>Approve?</button> 
                <button id='decline' onClick={declineHandler}>Decline?</button> 
                {!props.tr.attributes.backup_project ? <button id='backup' onClick={backupHandler}>Save as Backup?</button> : null}
            </div>  
        )
    }

    const classNameDefiner = () => props.tr.attributes.backup_project ? "saved-bu" : "tattreq-attrs"

    const displayRequest = () =>{
        return(
            <div>
                <div onClick={toggleShowReqDetails}>
                    {props.tr.attributes.backup_project ?  <div><strong>THIS IS A BACKUP PROJECT</strong></div> : null}
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
                <div><strong>{props.tr.attributes.accepted ? "This Request has been approved" : "This Request has not yet been approved"}</strong></div>
                <br></br>
                {displayDecisionButtons()}
            
            </div>
        )
    }

    const displayDeclineConfirmation = () => {
        return(
            <div>
                <h1>Are You Sure You Want to Decline This Request?</h1>
                <button onClick={confirmDecline}>Yes Decline and Notify Requestor</button> <button onClick={cancelDecline}>Cancel</button> 
            </div>
        )
    }

    const confirmDecline = () => {
        
        setDeclineConfirmationCanDisplay(false)
        setDeclneExplanationCanDisplay(true)
    }

    const declineInput = (e) =>{
        setExplanationText(e.target.value)
        
    }

    const declineTextArea = () => {
        return(
            <div>
            <h3>Please Enter Your Reason for Declining</h3>
            <h3>This message will be sent to the Requestor</h3>
            <form>
                <Field id="tr-request-decline" label="" placeHolder="Please Enter A Description of Your Desired Tattoo " explanationText={explanationText} changeHandler={(e) => declineInput(e)}/><br></br>
                <button onClick={declineSubmitHandler}>Submit</button> <button onClick={cancelDecline}>Cancel</button>
            </form>
            
        </div>
        )
    }

    const declineSubmitHandler = () =>{
        const req = props.tr
        const data = {
            tattoo_request:{
                declined: true,
                reason: explanationText
            }
        }
        axios({method: 'put', url: `${URL}/tattoo_requests/${req.id}`, data: data ,   headers: {'Content-Type': 'application/json'}}).then(resp => {  
            // console.log(resp)
            debugger
            // if(resp.statusText === "OK"){
            //     Refresh()
            // }else{
            //     alert('Unable to Save as Backup, Please contact system admin')
            // }
            
          }).catch( err => {  
            console.log(err)
          })  
    }

    const cancelDecline = () => {
        setRequestCanDisplay(true)
        setDeclineConfirmationCanDisplay(false)
        setDeclneExplanationCanDisplay(false)
    }
    
    // debugger
    return (
        <div key={props.tr.id} data-id={props.tr.id} className={classNameDefiner()}>
            {requestCanDisplay ? displayRequest() : null}
            {declineConfirmationCanDisplay ? displayDeclineConfirmation() : null}
            {declineExplanationCanDisplay ? declineTextArea() : null}
        </div>
        
        // <div  key={props.tr.id} data-id={props.tr.id} className={classNameDefiner()}  >
        //     <div onClick={toggleShowReqDetails}>
                
        //         {props.tr.attributes.backup_project ?  <div><strong>THIS IS A BACKUP PROJECT</strong></div> : null}
        //         <div>Request ID: {props.tr.id}</div>
        //         <div>Submitted on: {formattedDate()}</div>
        //         <div> {props.tr.attributes.user ? "Requestor has an account" : "Requested as a guest"}</div>
        //         <div>Requestor's Email: {props.tr.attributes.user ? props.tr.attributes.user.email : props.tr.attributes.guest_email}</div>
        //         {props.tr.attributes.user ? <div>Client Name: {props.tr.attributes.user.name}</div> : null}
        //         {props.tr.attributes.user ? <div>Previously Tattoo Approved? {props.tr.attributes.user.tattoo_approved ? "Yes" : "No"}</div> : null}
        //         <div>Description: {props.tr.attributes.description}</div>
        //         <br></br>
        //     </div>
        //         <AdminTattooRequestDetails key={props.tr.id} tr={props.tr} showReqDetails={showReqDetails}/>
        //     <br></br>
        //     <div><strong>{props.tr.attributes.accepted ? "This Request has been approved" : "This Request has not yet been approved"}</strong></div>
        //     <br></br>
        //     {/* MUST ADD LOGIC FOR APPROVED VS UNAPPROVED REQUESTS */}
        //     {displayDecisionButtons()}
            
        // </div>
    )
}

export default AdminTattooRequest