import {React, useState} from 'react'
import FullScreen from '../Fullscreen/Fullscreen'


const AdminTattooRequestDetails = (props) => {
    const [imageWidth, setImageWidth] = useState("220px")
    const [imageHeight, setImageHeight] = useState("250px")
    const [showFullScreen, setShowFullScreen] = useState(false)
    

    const parseNotes = () => props.tr.attributes.notes.map( n => <li key={n.id}>{n.content}</li>)

    // const fullScreen = () =>{
    //     setImageWidth("35vw")
    //     setImageHeight("80vh")
    // }

    // const fitToDetail = () =>{
    //     setImageWidth("220px")
    //     setImageHeight("250px")
    // }

    // const toggleFullScreen = () => imageWidth === "220px" ? fullScreen() : fitToDetail()  
    
    const toggleFullScreen = () => setShowFullScreen(!showFullScreen)
    
    return(
        <div id="tattreq-details" style={{display: props.showReqDetails ? 'block' : 'none'}}>
             {showFullScreen ? <FullScreen toggle={toggleFullScreen} type="image" imageSource={props.tr.attributes.body_location_image_path}/> : null}
            <div>Allergies: {props.tr.attributes.allergies}</div>
            <div>Body Location Image: <br></br>
                <img onClick={toggleFullScreen}className="body-location-image" src={props.tr.attributes.body_location_image_path} style={{height: imageHeight, width: imageWidth}}alt='location image of requested tattoo'/>
               
            </div>
            <br></br>
            <div>{props.tr.attributes.notes.length > 0 ? <ul> Notes: {parseNotes()} </ul> : "No Notes for this request"}</div>
        </div>
    )
}

export default AdminTattooRequestDetails