import {React, useState} from 'react'
import S3FileUpload from 'react-s3'
import axios from 'axios'
import Refresh from '../Utilites/Refresh'

const AdminProjectTattooRequest = (props) =>{
    const [selectedImage, setSelectedImage] = useState(false)
    const [showUpload, setShowUpload] = useState(false)
    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        dirName: process.env.REACT_APP_S3_PROJECT_MOCKUP_IMAGES,
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }

    const fileChange = (e) => {
        
        const { value } = e.target; 
        let ifImage = (/\.(gif|jpg|jpeg|png)$/i).test(value)
        
        if(!ifImage){
            // setShowSubmit(false)
          return;
        }
        setSelectedImage(e.target.files[0]) 
        setShowUpload(true)
    }

    const uploadMockup = (e) =>{
        e.preventDefault()
        S3FileUpload.uploadFile(selectedImage, config).then((data) => {
            patchMockupImageToDb(data.location)
        })
        .catch((err) =>{
            alert(err)
        })
    }

    const patchMockupImageToDb = (location) =>{
        const data ={
            'mockupimagelocation': location
        }
        axios({method: 'put', url: `http://localhost:3001/tattoo_requests/${props.project.attributes.tattoo_request.id}`, data: data ,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            debugger
            Refresh()
          }).catch( err => {  
            console.log(err)
          })  
        }

        const displayImageOrUploadOption = () =>{
           debugger
           if(!!props.project.attributes.tattoo_request.mockupImageLocation){
               return <img className="image-preview" src={props.project.attributes.tattoo_request.mockupImageLocation} alt="Mockup Tattoo Image" />
           }else{
               return <input id="progress-images" className="input" type="file" name="file" onChange={e => fileChange(e)}/>
           }
          
        }
    return(
        <div>
            <div>Request ID: {props.project.attributes.tattoo_request.id}</div>
            <div> Location on Body:</div>
            <div>
               <img className={props.imageDisplayClass()} onClick={props.togglePreviewImage} src={props.project.attributes.tattoo_request.body_location_image_path} alt="body image location" />
            </div>
            <div> Mockup Image:</div>
            {/* <input id="progress-images" className="input" type="file" name="file" onChange={e => fileChange(e)}/><br></br> */}
                {displayImageOrUploadOption()}
            <div> 
               {showUpload ? <button onClick={uploadMockup}>Upload Mockup Image</button> : null}
            </div>
        </div>
    )
}

export default AdminProjectTattooRequest