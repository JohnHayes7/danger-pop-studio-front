import {React, useState, useEffect} from 'react'
import S3FileUpload from 'react-s3'
import Navbar from '../Nav/Navbar'
import axios from 'axios'
import Field from '../InputFields/Field'
import { useHistory } from 'react-router-dom'
// import browserHistory  from 'react-router';
import './request-form.css'
import ApiUrl from '../Utilites/Url'

require('dotenv').config()

const TattooRequestForm = () =>{
    // TO DO: GENERATE RANDOM IDs IN RAILS
    // TO DO: ADD REQUEST DATE
    const [file, setFile] = useState({})
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [admin, setAdmin] = useState(false)
    const [requestText, setRequestText] = useState('')
    const [allergies, setAllergies] = useState('')
    const [isGuest, setIsGuest] = useState(true)
    const [progress , setProgress] = useState(0)
    const [showSubmit, setShowSubmit] = useState(false)
    const [image, setImage] = useState({})
    const [requestWindowOpen, setRequestWindowOpen] = useState(true)
    const history = useHistory()
    
    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        dirName: process.env.REACT_APP_S3_UPLOADS_FOLDER    ,
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }

    

    // const URL = 'https://danger-pop-api.herokuapp.com'

    useEffect(() =>{
        // NEEDS A REFACTOR TO UTILITES
        axios.get(ApiUrl + '/request_windows/1',{withCredentials:true})
        .then(response => {
            setRequestWindowOpen(response.data.openState)
        })

        axios.get(ApiUrl + '/logged_in', {withCredentials: true})
        .then(response => {
            console.log(response)
            if(response.data.logged_in){
                const user = response.data.user.data.attributes
                setIsGuest(false)
                setFullName(user.name)
                setEmail(user.email)
                setPhone(user.phone_number)
                setAdmin(user.administrator)
            }
                
        //     
        })
        // .catch(error => redirectToLogin())
    }, [])


    const postDataToDb = (fileData) =>{
        axios({method: 'post', url: ApiUrl + '/tattoo_requests', data: fileData,   headers: {'Content-Type': 'application/json'}}).then(resp => {
          
          if(resp.data.map){
                resp.data.map(d => alert(d))
          }else{
            //   SEND AUTO EMAIL TO MAX
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
                const fileData = {
                    tattoo_request: {
                        'guest_email': email,
                        'guest_full_name' : fullName,
                        'guest_phone': phone,
                        'description': requestText,
                        'allergies': allergies,
                        'body_location_image_path': data.location,
                        'is_guest': isGuest
                        
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

    const adminOptions = () =>{
        return(
            <div className='tr-admin-options'>
                <h1>Admin Options:</h1>
                {openClosedOptions()}
            </div>
        )
    }

    const openClosedOptions = () =>{
        if(requestWindowOpen){
            return <div className="tr-open-close" onClick={requestOpenCloseToggle}>Click to Close The Tattoo Request Window</div>
        }else{
            return <div className="tr-open-close" onClick={requestOpenCloseToggle}>Click to Open The Tattoo Request Window</div>
        }
    }

    const requestOpenCloseToggle = () =>{
        setRequestWindowOpen(!requestWindowOpen)
        // const windowState = {"open": !requestWindowOpen}
        debugger
        axios({method: 'patch', url: `${ApiUrl}/request_windows/1`, data: {open: !requestWindowOpen}, headers: {'Content-Type': 'application/json'}}).then(resp => {
            debugger
            // console.log(resp)
            // Refresh()
          }).catch( err => {  
            console.log(err)
          })
    }

    const requestForm = () =>{
        return(
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
                </div>
        )
    }

    const requestsClosed = () =>{
        return (
            <div>
                <div><p>We're sorry but the Request Window is currently closed</p><p>It will be reopening soon</p><p>Please follow our Social accounts for more info</p></div>
            </div>
        )
    }


   
    return(
        
        <div>
            <Navbar />
            <div className='tr-form-options'>
                {admin ? adminOptions() : null}
                {requestWindowOpen ? requestForm() : requestsClosed()}
            </div>
                
        </div>
    )
}

export default TattooRequestForm