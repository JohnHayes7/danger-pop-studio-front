import {React, useState} from 'react'
import S3FileUpload from 'react-s3'
import Navbar from '../Nav/Navbar'
import axios from 'axios'
import Field from '../InputFields/Field'


const TattooRequestForm = () =>{

    const [file, setFile] = useState({})
    const [email, setEmail] = useState('')
    const [requestText, setRequestText] = useState('')
    const [allergies, setAllergies] = useState('')
    const [isGuest, setIsGuest] = useState(false)

    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }

    
   

    const handleSubmit = (e) =>{
        e.preventDefault();
        S3FileUpload.uploadFile(file, config).then((data) => {
            console.log(data)
        })
        .catch((err) =>{
            alert(err)
        })
        
    //     const fileData = {
    //         tattoo_request: {
    //             'guest_email': email,
    //             'description': requestText,
    //             'allergies': allergies,
    //             'image': file
    //         } 
    //     }
    //     debugger
    //   axios({method: 'post', url: 'http://localhost:3001/tattoo_requests', data: fileData,   headers: {'Content-Type': 'multipart/form-data'}}).then(resp => {
    //       //update state or whatever you want to do with the resp
    //       console.log("1", resp)
    //     }).catch( err => {  
    //       //catch the error
    //       console.log(err)
    //     })
    //     // FETCH??
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