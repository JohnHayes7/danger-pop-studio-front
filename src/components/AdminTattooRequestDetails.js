import React from 'react'


const AdminTattooRequestDetails = (props) => {
    debugger

    const parseNotes = () => props.tr.attributes.notes.map( n => <li key={n.id}>{n.content}</li>)
    

    return(
        <div id="tattreq-details" style={{display: props.showReqDetails ? 'block' : 'none'}}>
            <div>Body Location Image:<img src={'arms_prioritize_scr1.jpeg'} alt='location image of requested tattoo'/></div>
            <br></br>
            <div>{props.tr.attributes.notes.length > 0 ? <ul> Notes: {parseNotes()} </ul> : "No Notes for this request"}</div>
        </div>
    )
}

export default AdminTattooRequestDetails