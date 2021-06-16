import React from 'react'
import Field from '../InputFields/Field'

const FsArtistForm = () =>{
    return(
        <div className='admin-option'>
            <h3>Add New Artist</h3>
            <form>
                <div className='admin-input-fields'>
                    <Field label='Artist Email' id="email"/>
                    <Field label='password' id='password' />
                </div>
                <div className='submit-button'>
                    Create New Artist
                </div>
            </form>
        </div>
    )
}

export default FsArtistForm