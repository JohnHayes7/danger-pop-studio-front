import React, {useState} from 'react'
import Field from '../InputFields/Field'
import axios from 'axios'

const FsArtistForm = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [refreshState, setRefreshState] = useState(false)

    const artist = {
        email: email,
        password: password,
        // administrator: true

    }

    const emailInput = (e) => {
        debugger
        setEmail(e.target.value)
        // setEmail()
    }

    const passInput = (e) =>{
        setPassword(e.target.value)
    }


    const saveNewArtist = () =>{
        axios.post('http://localhost:3001/artists', {artist}, {withCredentials: true})
        .then(response =>{
            // if (response.data.data.attributes.administrator){
            //     alert('You Have added a New Admin')
            //     // setRefreshState(!refreshState)
                
            // }
            debugger
            // let rxdUser = response.data.user.data.attributes
            // rxdUser.administrator ? history.push('/admin') : history.push(`/users/${response.data.user.data.id}`)
            
        })
    }
    return(
        <div className='admin-option'>
            <h3>Add New Artist</h3>
            <form>
                <div className='admin-input-fields'>
                    <Field label='Artist Email' id="email" onChange={e => emailInput(e)}/>
                    <Field label='password' id='password' onChange={e => passInput(e)}/>
                </div>
                <div className='submit-button' onClick={saveNewArtist}>
                    Create New Artist
                </div>
            </form>
        </div>
    )
}

export default FsArtistForm