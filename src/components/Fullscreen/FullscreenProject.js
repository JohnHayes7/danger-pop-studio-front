import React from 'react'
import ProjectAppointments from '../Projects/ProjectAppointments'

const FullscreenProject = (props) =>{
    const parseProgressImages = () =>{
        return props.project.attributes.progress_images.map(img => <img className='progress-image' src={img} alt="tattoo-progress image" />)
    }

    // 
    return(
        <div className="full-screen" >
            <div className='fs-top'>
                <div className='fs-top-title'>   
                    <h1>Project ID: {props.project.id}</h1>
                    <div>Client Name: {props.project.attributes.user.name}</div>
                    <div>Client Email: {props.project.attributes.user.email}</div>
                    <div>Description: {props.project.attributes.tattoo_request.description}</div>
                </div>
                <div className='fs-top-appts'>
                    <span className='exit-x' onClick={props.toggle}>X</span>   
                    <h1>Book Appt:</h1> 
                    <div><ProjectAppointments project={props.project}/></div>
                </div>
            </div>
            <div className='directionals'>
                <div id='prev' onClick={props.previous}>PREV</div><br></br>
                <div id='next' onClick={props.next}>NEXT</div>
            </div>
            <div className='fs-bottom'>
            <h1>Images:</h1>
                <div className='fs-bottom-mock-loc-img'>
                    <div className='project-image'> 
                        Mockup Image: <div><img className='mock-loc-image' src={props.project.attributes.tattoo_request.mockupImageLocation} alt='mockup'/></div>
                    </div>
                    <div className='project-image'> Location Image:<div><img className='mock-loc-image' src={props.project.attributes.tattoo_request.body_location_image_path} alt='body-location'/></div></div>
                    <div className='project-image'>Progress Images: <div>{parseProgressImages()}</div></div>
                    {/* <div> Mockup Image:</div> */}
                </div>
                {/* <div>
                   
                </div> */}
            </div>
        </div>
    )
}

export default FullscreenProject