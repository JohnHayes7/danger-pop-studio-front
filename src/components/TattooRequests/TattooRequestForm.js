import {React, useState} from 'react'
import Navbar from '../Nav/Navbar'
import axios from 'axios'
import Field from '../InputFields/Field'


const TattooRequestForm = () =>{

    const [file, setFile] = useState({})
    const [imageName, setImageName] = useState('')

    const handleSubmit = (e) =>{
        
        e.preventDefault();
        let fileData = new FormData();
       
        fileData.append('imagefile', file); 
        debugger
      axios({method: 'post', url: 'http://localhost:3001/tattoo_requests', data: fileData,   headers: {'Content-Type': 'multipart/form-data'}}).then(resp => {
          //update state or whatever you want to do with the resp
          console.log("1", resp)
        }).catch( err => {  
          //catch the error
          console.log(err)
        })
      }

    const fileChange = (e) => {
        
        const { value } = e.target; 
        let ifImage = (/\.(gif|jpg|jpeg|png)$/i).test(value)
        if(!ifImage){
            
          return;
        }
        setFile(e.target.files[0]) 
        //  this.setState({...this.state, file: event.target.files[0])}
    }


    return(
        <div>
            <Navbar />
            <h1>TATTOO REQUEST FORM</h1>
            <div className="tr-req-form">
                <form onSubmit={e => handleSubmit(e)}>
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