import React from 'react'

const AdminProjectTattooRequest = (props) =>{
    return(
        <div>
            <div>Request ID: {props.project.attributes.tattoo_request.id}</div>
            <div> Location on Body:</div>
            <div>
               
                <img className={props.imageDisplayClass()} onClick={props.togglePreviewImage} src={props.project.attributes.tattoo_request.body_location_image_path} alt="body image location" />
            </div>
        </div>
    )
}

export default AdminProjectTattooRequest