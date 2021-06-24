import React, {useState} from 'react'
import Refresh from '../Utilites/Refresh'
import ProjectAppointments from '../Projects/ProjectAppointments'

const FullscreenRequest = (props) => {

    const [showScheduleOptions, setShowScheduleOptions] = useState(false)
    const [showRequestOptions, setShowRequestOptions]  = useState(true)
    const [acceptedReqProj, setAcceptedReqProj] = useState({})

    const toggleSchedulingOptions = () => setShowScheduleOptions(!showScheduleOptions)
    const toggleRequestOptions = () => setShowRequestOptions(!showRequestOptions)

    const acceptAsProject = () =>{
        const req = props.project
        req.attributes.accepted = true
        fetch('http://localhost:3001/projects',{
            method: "post",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then(resp => resp.json())
        .then(rxData => {
            if(parseInt(props.project.id) === rxData.data.attributes.tattoo_request.id){
                setAcceptedReqProj(rxData.data)
                toggleSchedulingOptions()
                toggleRequestOptions()
                
            }
        })
        
    }

    const displayRequestOptions = () =>{
        return(
            <div>
                <span className='request-options' onClick={acceptAsProject}>Accept {"&"} Schedule</span>
                <span className='request-options'>Accept {"&"} Schedule Later</span>
                <span className='request-options'>Decline</span>
            </div>
        )
    }

    const schedulingOptions = () => {
        return(
            <div>
                <h1>Scheduling Options:</h1>
                <ProjectAppointments project={acceptedReqProj}/>
            </div>
        )
    }
    
    return(
        <div class='full-screen'>
            <div class='fs-top'>
                <div class='fs-top-title'>
                    <div>Tattoo Request ID: {props.project.id}</div><span className='exit-x' onClick={props.toggle}>X</span>  
                    <div>Name: {props.project.attributes.guest_full_name}</div>
                    <div>Email: {props.project.attributes.guest_email}</div>
                    <div>Description: {props.project.attributes.description}</div>
                </div>
                <div className='fs-top-options'>
                    <h1>Request Options:</h1><br></br>
                    {showRequestOptions ? displayRequestOptions() : null}
                </div>
            </div>
            <div class='fs-bottom'>
                <div>
                    <h1>Body Location Image:</h1>
                    <img className="fs-body-location-image" src={props.project.attributes.body_location_image_path} alt='body-location' />
                </div>
                <div className='schedule-options'>
                    {showScheduleOptions ? schedulingOptions()  : null}
                </div>
            </div>
        </div>
    )
}

export default FullscreenRequest