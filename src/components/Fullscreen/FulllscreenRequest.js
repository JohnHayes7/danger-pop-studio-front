import React, {useState} from 'react'
import axios from 'axios'

const FullscreenRequest = (props) => {

    const [showScheduleOptions, setShowScheduleOptions] = useState(true)

    const toggleFullScreen = () => setShowScheduleOptions(!showScheduleOptions)

    const acceptAsProject = () =>{
        
    }
    
    return(
        <div class='full-screen'>
            <div class='fs-top'>
                <div class='fs-top-title'>
                    <div>Tattoo Request ID: {props.project.id}</div>
                    <div>Name: {props.project.attributes.guest_full_name}</div>
                    <div>Email: {props.project.attributes.guest_email}</div>
                    <div>Description: {props.project.attributes.description}</div>
                </div>
                <div className='fs-top-options'>
                    <h1>Request Options:</h1><br></br>
                    <span className='request-options' onClick={toggleFullScreen}>Accept {"&"} Schedule</span><span className='request-options'>Accept {"&"} Schedule Later</span><span className='request-options'>Decline</span>
                </div>
            </div>
            <div class='fs-bottom'>
                <div>
                    <h1>Body Location Image:</h1>
                    <img className="fs-body-location-image" src={props.project.attributes.body_location_image_path} alt='body-location' />
                </div>
                <div className='schedule-options'>
                    {showScheduleOptions ? <h1>Scheduling Options:</h1> : null}
                </div>
            </div>
        </div>
    )
}

export default FullscreenRequest