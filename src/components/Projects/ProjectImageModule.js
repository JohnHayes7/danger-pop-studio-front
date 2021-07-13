import {React, useState} from 'react'
import S3FileUpload from 'react-s3'
import axios from 'axios'
import Refresh from '../Utilites/Refresh'


const ProjectImageModule = (props) =>{

    const [selectedImage, setSelectedImage] = useState({})
    const [showProgressUpload, setShowProgressUpload] = useState(false)
    const [showFinalUpload, setShowFinalUpload] = useState(false)

    const progressConfig = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        dirName: process.env.REACT_APP_S3_PROJECT_PROGRESS_UPLOADS,
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }
    const finalConfig = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        dirName: process.env.REACT_APP_S3_PROJECT_FINAL_UPLOADS,
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }

    const URL = "https://danger-pop-api.herokuapp.com/"

    const fileChange = (e) => {
        
        const { value } = e.target; 
        let ifImage = (/\.(gif|jpg|jpeg|png)$/i).test(value)
        
        if(!ifImage){
            // setShowSubmit(false)
          return;
        }
        setSelectedImage(e.target.files[0]) 
        e.currentTarget.id === 'final-images' ? setShowFinalUpload(true) : setShowProgressUpload(true)
    }

    const uploadProgessImage = (e) =>{
        e.preventDefault()
        S3FileUpload.uploadFile(selectedImage, progressConfig).then((data) => {
            patchProgressImageLocationToDb(data.location)
        })
        .catch((err) =>{
            alert(err)
        })
    }

    const uploadFinalImage = (e) => {
        e.preventDefault()
        S3FileUpload.uploadFile(selectedImage, finalConfig).then((data) => {
            patchFinalImageLocationToDb(data.location)
        })
        .catch((err) =>{
            alert(err)
        })
    }

    const patchFinalImageLocationToDb = (location) => {
        const data ={
            'finalimagelocation': location
        }
        axios({method: 'put', url: `${URL}/projects/${props.project.id}`, data: data ,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            debugger
            Refresh()
          }).catch( err => {  
            console.log(err)
          })  
    }

    const patchProgressImageLocationToDb = (location) =>{
        const data = {
            'progressimagelocation': location
        }
        axios({method: 'put', url: `${URL}/projects/${props.project.id}`, data: data ,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            Refresh()
          }).catch( err => {  
            console.log(err)
          })  
    }

    const displayProgressPics = () =>{
        return props.project.attributes.progress_images.map( i => <img className="image-preview" src={i} alt="project-progress-image" />)
    }

    const displayFinalImages = () => {
        // debugger
        return props.project.attributes.final_images.map(i => <img className="image-preview" src={i} alt="final-project-image" />)
    }
    debugger
    return(
        <div>
            <div>
                Progress Pics: 
                <div>{displayProgressPics()}</div>
                <div>{props.user && props.user.attributes.administrator ? <input id="progress-images" className="input" type="file" name="file" onChange={e => fileChange(e)}/> : null}</div>
                {showProgressUpload ? <button onClick={e => uploadProgessImage(e)  }>Add Image</button> : null}
            </div>
            <br></br>
            <div>Final Pics:
                <div>{displayFinalImages()}</div>
                <div>{props.user && props.user.attributes.administrator ? <input id="final-images" className="input" type="file" name="file" onChange={e => fileChange(e)}/>: null}</div>
                {showFinalUpload ? <button  onClick={e => uploadFinalImage(e)}>Add Image of Completed Project</button> : null}
            </div>
        </div>
    ) 
}

export default ProjectImageModule