import React from 'react'


const AdminTattooRequestDetails = (props) => {
    debugger
    return(
        <div id="tattreq-details" style={{display: props.showReqDetails ? 'block' : 'none'}}>
            {props.tr.id}
        </div>
    )
}

export default AdminTattooRequestDetails