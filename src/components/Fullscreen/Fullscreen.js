import React, {useState} from 'react'
import ProjectAppointments from '../Projects/ProjectAppointments'
import axios from 'axios'
import Field from '../InputFields/Field'
import FullscreenImage from './FullscreenImage'
import FullscreenProject from './FullscreenProject'


const Fullscreen = (props) => {
    
    const [requestWindowOpen, setRequestWindowOpen] = useState(true)

    const propsType = () => {
        switch(props.type){
            case 'project': return typeProject();
            case 'image': return typeImage();
            case 'admin-options': return typeAdminOpts()
        }
    }

    const typeImage = () => <FullscreenImage toggle={props.toggle} imageSource={props.imageSource} />

    const typeProject = () => <FullscreenProject project={props.project} toggle={props.toggle} previous={props.previous} next={props.next}  />
    

    



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