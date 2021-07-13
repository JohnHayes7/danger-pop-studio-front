import React, {useState} from 'react'
import Field from '../InputFields/Field'
import axios from 'axios'

const FsArtistForm = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [refreshState, setRefreshState] = useState(false)

    const URL ="https://danger-pop-api.herokuapp.com/"


    const artist = {
        email: email,
        password: password,
        // administrator: true

    }

    const emailInput = (e) => {
        
        setEmail(e.target.value)
        // setEmail()
    }

    const passInput = (e) =>{
        setPassword(e.target.value)
    }


    const saveNewArtist = () =>{
        axios.post(URL + '/artists', {artist}, {withCredentials: true})
        .then(response =>{
            if (response.data.data){
                alert('You Have added a New Artist')
            }
        })
    }
    return(
        <div className='admin-option'>
            <h3>Add New Artist</h3>
            <form>
                <div className='admin-input-fields'>
                    <Field label='Artist Email' id="email" changeHandler={e => emailInput(e)}/>
                    <Field label='password' id='password' changeHandler={e => passInput(e)}/>
                </div>
                <div className='submit-button' onClick={saveNewArtist}>
                    Create New Artist
                </div>
            </form>
        </div>
    )
}

export default FsArtistForm