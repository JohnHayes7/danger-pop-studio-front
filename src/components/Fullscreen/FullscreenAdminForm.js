import React, {useState} from 'react'
import Field from '../InputFields/Field'
import axios from 'axios'
import URL from '../Utilites/Url'

const FsAdminForm = (props) =>{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [refreshState, setRefreshState] = useState(false)
    // const URL = "https://danger-pop-api.herokuapp.com"
    const user = {
        email: email,
        password: password,
        administrator: true

    }

    const emailInput = (e) => {
        
        setEmail(e.target.value)
        // setEmail()
    }

    const passInput = (e) =>{
        setPassword(e.target.value)
    }


    const saveNewAdmin = (e) =>{
        axios.post(URL + '/users', {user}, {withCredentials: true})
        .then(response =>{
            if (response.data.data.attributes.administrator){
                alert('You Have added a New Admin')
                // setRefreshState(!refreshState)
                
            }
            // 
            // let rxdUser = response.data.user.data.attributes
            // rxdUser.administrator ? history.push('/admin') : history.push(`/users/${response.data.user.data.id}`)
            
        })
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