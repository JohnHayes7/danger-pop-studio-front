import {React, useState} from 'react'
import S3FileUpload from 'react-s3'
import Navbar from '../Nav/Navbar'
import axios from 'axios'
import Field from '../InputFields/Field'
import { useHistory } from 'react-router-dom'
// import browserHistory  from 'react-router';
import './request-form.css'

const TattooRequestForm = () =>{
    // TO DO: GENERATE RANDOM IDs IN RAILS
    // TO DO: ADD REQUEST DATE
    const [file, setFile] = useState({})
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [requestText, setRequestText] = useState('')
    const [allergies, setAllergies] = useState('')
    const [isGuest, setIsGuest] = useState(false)
    const [progress , setProgress] = useState(0)
    const [showSubmit, setShowSubmit] = useState(false)
    const [image, setImage] = useState({})
    const history = useHistory()
    
    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        dirName: process.env.REACT_APP_S3_UPLOADS_FOLDER    ,
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }

    const postDataToDb = (fileData) =>{
        axios({method: 'post', url: 'http://localhost:3001/tattoo_requests', data: fileData,   headers: {'Content-Type': 'application/json'}}).then(resp => {
          
          if(resp.data.map){
                resp.data.map(d => alert(d))
          }else{
            //   SEND AUTO EMAIL TO MAX AND REQUESTOR
            //   SEND USER TO SUCCESS NOTIFICATION
            history.push('/tattoo-requests/success')

            console.log("1", resp)
          }
          
        }).catch( err => {  
          //catch the error
          console.log(err)
        })
    }

    
   
   
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(confirmEmail()){
            S3FileUpload.uploadFile(file, config).then((data) => {
                debugger
                const fileData = {
                    tattoo_request: {
                        'guest_email': email,
                        'guest_full_name' : fullName,
                        'guest_phone': phone,
                        'description': requestText,
                        'allergies': allergies,
                        'body_location_image_path': data.location
                        
                    } 
                }
                postDataToDb(fileData)
            })
            .catch((err) =>{
                alert(err)
            })
        }else{
            alert('Please enter a Valid Email Address')
        }
        
    }


    const fileChange = (e) => {
        
        const { value } = e.target; 
        let ifImage = (/\.(gif|jpg|jpeg|png)$/i).test(value)
        
        if(!ifImage){
            setShowSubmit(false)
          return;
        }
        setImage(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]) 
        setShowSubmit(true)
       
    }

    const fullNameInput = (e) =>{
        setFullName(e.target.value)
    }

    const phoneInput = (e) =>{
        setPhone(e.target.value)
    }


    const emailInput = (e) =>{
       setEmail(e.target.value) 
    }

    const confirmEmail = () =>{
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
            
            <div className="tr-req-form">
            <h1>DANGER POP TATTOO REQUEST FORM</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <Field id="full-name" label = 'Full Name' fullName={fullName} changeHandler={e => fullNameInput(e)} /> <br></br>
                    <Field id='phone' label="Phone#" phone={phone}  changeHandler={e=> phoneInput(e)} /><br></br>
                    <Field id="email" label="Email" placeHolder="Email Address" email={email} changeHandler={e => emailInput(e)}  /><br></br>
                    <Field id="request-text" label="Request" placeHolder="Please Enter A Description of Your Desired Tattoo " requestText={requestText} changeHandler={(e) => requestInput(e)}/><br></br>
                    <Field id="allergies" label="Allergies" placeHolder="Please list any allergies of which you are aware" allergies={allergies} changeHandler={(e) => allergiesInput(e)}/><br></br>
                    <div className="control">
                        <label className="label">Upload image</label>
                        {/* {image ? <img src={image} height="100px" width="50px" /> : null} */}
                        <input className="input" type="file" name="file" onChange={e => fileChange(e)}/>
                        
                    </div><br></br>
                    <br></br>
                    <div>
                        {showSubmit ? <button className='form-submit-button'>Submit</button> : null}
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