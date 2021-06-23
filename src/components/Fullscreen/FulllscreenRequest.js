import React from 'react'

const FullscreenRequest = (props) => {
    debugger
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
                    <span className='request-options'>Accept {"&"} Schedule</span><span className='request-options'>Accept {"&"} Schedule Later</span><span className='request-options'>Decline</span>
                </div>
            </div>
            <div class='fs-bottom'>
                <h1>Body Location Image:</h1>
                <img className="fs-body-location-image" src={props.project.attributes.body_location_image_path} alt='body-location' />
            </div>
        </div>
    )
}

export default FullscreenRequest