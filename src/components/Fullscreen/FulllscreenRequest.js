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
            </div>
        </div>
    )
}

export default FullscreenRequest