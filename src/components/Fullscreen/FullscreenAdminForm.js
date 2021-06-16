import React, {useState} from 'react'
import Field from '../InputFields/Field'
import axios from 'axios'

const FsAdminForm = () =>{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailInput = (e) => {
        debugger
        setEmail(e.target.value)
        // setEmail()
    }

    const passInput = (e) =>{
        setPassword(e.target.value)
    }


    const saveNewAdmin = (e) =>{
        
    }

    return(
        <div className='admin-option'>
            <h3>Add New Administrator</h3>
            <form> 
                <div className='admin-input-fields'>
                    <Field label='Administrator Email' id="email" changeHandler={e => emailInput(e)}/>
                    <Field label='password' id='password' changeHandler={e => passInput(e)}/>
                </div>
                <div className='submit-button' onClick={e => saveNewAdmin(e)}>
                    Create New Admin
                </div>
            </form>
        </div>
    )
}

export default FsAdminForm