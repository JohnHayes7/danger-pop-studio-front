import React, {useState} from 'react'
import ProjectAppointments from '../Projects/ProjectAppointments'
import axios from 'axios'
import Field from '../InputFields/Field'


const Fullscreen = (props) => {
    
    const [requestWindowOpen, setRequestWindowOpen] = useState(true)

    const propsType = () => {
        switch(props.type){
            case 'project': return typeProject();
            case 'image': return typeImage();
            case 'admin-options': return typeAdminOpts()
        }
    }

    const typeImage = () =>{
        return( 
            <div className="full-screen" onClick={props.toggle}>
                <img className="fs-image" src={props.imageSource} alt='body image' />
                

            </div>
        )
    }


    

    const typeProject = () =>{
        debugger
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

    const parseProgressImages = () =>{
        return props.project.attributes.progress_images.map(img => <img className='progress-image' src={img} alt="tattoo-progress image" />)
    }

    

    const typeAdminOpts = () => {
        return (
            <div className='full-screen'>
                <h1>Admin Options</h1>
                <div className='fs-top-level'>
                    <div className='admin-option'>
                        <h3>Tattoo Request Window:</h3>
                        <div className="open-close-option">
                            <div className={openClosedClass()} onClick={requestOpenCloseToggle}>{requestWindowOpen ? "Click To Close Tattoo Request Window" : "Click To Open Tattoo Request Window" }</div>
                        </div>
                    </div>
                    <div className='admin-option'>
                        <h3>Add New Administrator</h3>
                        <form> 
                            <div className='admin-input-fields'>
                                <Field label='Administrator Email' id="email"/>
                                <Field label='password' id='password' />
                            </div>
                            <div className='submit-button'>
                                Create New Admin
                            </div>
                        </form>
                    </div>
                </div>
                <div className='fs-bot-level'>
                    <div className='admin-option'>
                        <h3>Add New Artist</h3>
                        <form>
                            <div className='admin-input-fields'>
                                <Field label='Artist Email' id="email"/>
                                <Field label='password' id='password' />
                            </div>
                            <div className='submit-button'>
                                Create New Artist
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        )
    }

    const openClosedClass = () => requestWindowOpen ? "window-open" : "window-closed"

    const requestOpenCloseToggle = () =>{
        setRequestWindowOpen(!requestWindowOpen)
        // const windowState = {"open": !requestWindowOpen}
        // debugger
        axios({method: 'patch', url: `http://localhost:3001/request_windows/1`, data: {open: !requestWindowOpen}, headers: {'Content-Type': 'application/json'}}).then(resp => {
            debugger
            // console.log(resp)
            // Refresh()
          }).catch( err => {  
            console.log(err)
          })
    }

    

    return(
        <div>{propsType()}</div>
    )
    
}

export default Fullscreen