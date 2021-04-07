import {React, useState} from 'react'
import S3FileUpload from 'react-s3'
// import AWS from 'aws-sdk'
import Navbar from '../Nav/Navbar'
import axios from 'axios'
import Field from '../InputFields/Field'


const TattooRequestForm = () =>{

    const [file, setFile] = useState({})
    const [email, setEmail] = useState('')
    const [requestText, setRequestText] = useState('')
    const [allergies, setAllergies] = useState('')
    const [isGuest, setIsGuest] = useState(false)
    const [progress , setProgress] = useState(0)
    // const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;
    // const REGION = process.env.REACT_APP_AWS_REGION


    // AWS.config.update({
    //     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    // })
    // const myBucket = new AWS.S3({
    //     params: {Bucket: S3_BUCKET},
    //     region: REGION,
    // })
    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }

    const sendDataToDb = (fileData) =>{
        axios({method: 'post', url: 'http://localhost:3001/tattoo_requests', data: fileData,   headers: {'Content-Type': 'application/json'}}).then(resp => {
          //update state or whatever you want to do with the resp
          console.log("1", resp)
        }).catch( err => {  
          //catch the error
          console.log(err)
        })
    }

    
   
   
    const handleSubmit = (e) =>{
        
        e.preventDefault();
        // const params = {
        //     ACL: 'public-read',
        //     Body: file,
        //     Bucket: S3_BUCKET,
        //     Key: file.name
        // };

        // myBucket.putObject(params)
        //     .on('httpUploadProgress', (evt) => {
        //         setProgress(Math.round((evt.loaded / evt.total) * 100))
        //     })
        //     .send((err) => {
        //         if (err) console.log(err)
        //     })
        S3FileUpload.uploadFile(file, config).then((data) => {
            const fileData = {
                tattoo_request: {
                    'guest_email': email,
                    'description': requestText,
                    'allergies': allergies,
                    'body_location_image_path': data.location
                } 
            }
            sendDataToDb(fileData)
            
        })
        .catch((err) =>{
            alert(err)
        })
        
        
    //     debugger
      
        
      }

    const fileChange = (e) => {
        
        const { value } = e.target; 
        let ifImage = (/\.(gif|jpg|jpeg|png)$/i).test(value)
        if(!ifImage){
            
          return;
        }
        setFile(e.target.files[0]) 
        
    }

    const emailInput = (e) =>{
       setEmail(e.target.value)
        
    }

    const confirmEmail = (email) =>{
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email) ?  true : false
    }

    const requestInput = (e) =>{
        setRequestText(e.target.value)
    }
    
    const allergiesInput = (e) =>{
        setAllergies(e.target.value)
    }


   
    return(
        
        <div>
            <Navbar />
            <h1>TATTOO REQUEST FORM</h1>
            {/* <div>Native SDK File Upload Progress is {progress}%</div> */}
            <div className="tr-req-form">
                <form onSubmit={e => handleSubmit(e)}>
                    
                    <Field id="email" label="Email" email={email} changeHandler={e => emailInput(e)} />
                    <Field id="request-text" label="Request" requestText={requestText} changeHandler={(e) => requestInput(e)}/>
                    <Field id="allergies" label="Allergies" allergies={allergies} changeHandler={(e) => allergiesInput(e)}/>
                    <label className="label">Upload image</label>
                    <div className="control">
                        <input className="input" type="file" name="file" onChange={e => fileChange(e)}/>
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
                {/* <form>
                    <Field label="Username" />
                    <Field label="Password" />
                </form> */}
                
            </div>
        </div>
    )
}

export default TattooRequestForm