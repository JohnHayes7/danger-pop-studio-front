import {React, useState} from 'react'
import S3FileUpload from 'react-s3'
import axios from 'axios'
import Refresh from '../Utilites/Refresh'
import URL from '../Utilites/Url'

const ProjectUser = (props) =>{

    const [idImage, setIdImage] = useState({})
    const [showUpload, setShowUpload] = useState(false)
    
    // const URL = 'https://danger-pop-api.herokuapp.com'

    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        dirName: process.env.REACT_APP_S3_ID_UPLOADS,
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
            S3FileUpload.uploadFile(idImage, config).then((data) => {
                patchImageLocationToDb(data.location)
            })
            .catch((err) =>{
                alert(err)
            })
        
    }

    const patchImageLocationToDb = (location) =>{
        const user = props.project.attributes.user
        user.id_img_path = location
        axios({method: 'put', url: `${URL}/users/${user.id}`, data: user ,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            Refresh()
          }).catch( err => {  
            console.log(err)
          })
    }


    const fileChange = (e) => {
        
        const { value } = e.target; 
        let ifImage = (/\.(gif|jpg|jpeg|png)$/i).test(value)
        
        if(!ifImage){
            // setShowSubmit(false)
          return;
        }
        // setImage(URL.createObjectURL(e.target.files[0]))

        setIdImage(e.target.files[0]) 
        setShowUpload(true)
       
    }

    const displayIdOrUpload = () =>{
        if(props.project.attributes.user.id_img_path){
            return <img className="id-image" src={props.project.attributes.user.id_img_path} alt="User ID Image" />
        }else{
            return(
                <div>
                    <input className="input" type="file" name="file" onChange={e => fileChange(e)}/><br></br>
                    {showUpload ? <button onClick={e => handleSubmit(e)}>Upload ID Image</button> : null}
                </div>
                
            )
        }
    }
    
    return(
        <div>
            <div>Name: {props.project.attributes.user.name || "User needs to update profile"}</div>
            <div>ID#: {props.project.attributes.user.id}</div>
            <div>Email: {props.project.attributes.user.email}</div>
            <div>Phone: {props.project.attributes.user.phone_number}</div>
            <div>Allergies: {props.project.attributes.user.allergies}</div>
            <div>
                Proof Of Age: 
                <div>{displayIdOrUpload()}</div>
            </div>
        </div> 
    )
}

export default ProjectUser