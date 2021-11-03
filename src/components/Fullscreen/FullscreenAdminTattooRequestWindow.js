import React, {useState} from 'react'
import axios from 'axios'
import URL from '../Utilites/Url'

const FsTattooRequestWindow = () =>{

    const [requestWindowOpen, setRequestWindowOpen] = useState(true)

    const openClosedClass = () => requestWindowOpen ? "window-open" : "window-closed"
    // const URL = 'https://danger-pop-api.herokuapp.com'
    const requestOpenCloseToggle = () =>{
        setRequestWindowOpen(!requestWindowOpen)
        // const windowState = {"open": !requestWindowOpen}
        // 
        axios({method: 'patch', url: `${URL}/request_windows/1`, data: {open: !requestWindowOpen}, headers: {'Content-Type': 'application/json'}}).then(resp => {
            
            // console.log(resp)
            // Refresh()
          }).catch( err => {  
            console.log(err)
          })
    }
    return(
        <div className='admin-option'>
            <h3>Tattoo Request Window:</h3>
            <div className="open-close-option">
                <div className={openClosedClass()} onClick={requestOpenCloseToggle}>{requestWindowOpen ? "Click To Close Tattoo Request Window" : "Click To Open Tattoo Request Window" }</div>
            </div>
        </div>
    )
}

export default FsTattooRequestWindow