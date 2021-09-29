import React, {useState} from 'react'
import S3FileUpload from 'react-s3'
import axios from 'axios'
import Refresh from '../Utilites/Refresh'
import Url from '../Utilites/Url'


const UserData = (props) => {

    const [idImage, setIdImage] = useState({})
    const [showUpload, setShowUpload] = useState(false)

    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        dirName: process.env.REACT_APP_S3_ID_UPLOADS,
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }

    const fileChange = (e) => {
        
        const { value } = e.target; 
        let ifImage = (/\.(gif|jpg|jpeg|png)$/i).test(value)
        
        if(!ifImage){
            setShowUpload(false)
          return;
        }
        // setImage(URL.createObjectURL(e.target.files[0]))
        
        setIdImage(e.target.files[0]) 
        setShowUpload(true)
       
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
       
            S3FileUpload.uploadFile(idImage, config).then((data) => {
                debugger
                patchImageLocationToDb(data.location)
            })
            .catch((err) =>{
               
                alert(err)
            })
        
    }

    const patchImageLocationToDb = (location) =>{
        // debugger
        const user = props.user
        user.id_img_path = location
        debugger
        axios({method: 'put', url: `${Url}/users/${user.id}`, data: user ,   headers: {'Content-Type': 'application/json'}}).then(resp => {
           debugger
            Refresh()
          }).catch( err => {  
            console.log(err)
          })
    }

    const displayImg = () =>{
        if(!props.user.id_img_path){
           return displayUpload()
        }else{
           return  <div className="id-preview"><img className="id-preview" src={props.user.id_img_path} /></div>
        }
    }

    const displayUpload = () => {
        return (
            <div>
                <div><h3>Please Upload a Photo of your ID</h3></div>
                <div>
                    <input className="input" type="file" name="file" onChange={e => fileChange(e)}/><br></br>
                    {showUpload ? <button onClick={e => handleSubmit(e)}>Upload ID Image</button> : null}
                </div>
            </div>
            
            
        )
    }


    return(
        <div className="user-mod">
            <h1>Profile Info</h1>
            <h2>Name:{props.user.name}</h2>
            <h2>Email: {props.user.email}</h2>
            <h2>Phone: {props.user.phone_number}</h2>
            <div>
                <h2>ID Image: </h2>
                {displayImg()}
            </div>
        </div>
    )
}

export default UserData