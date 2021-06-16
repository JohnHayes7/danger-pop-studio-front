import React, {useState} from 'react'
import axios from 'axios'
import Field from '../InputFields/Field'

const FullscreenAdminOptions = () =>{

    const [requestWindowOpen, setRequestWindowOpen] = useState(true)

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

export default FullscreenAdminOptions