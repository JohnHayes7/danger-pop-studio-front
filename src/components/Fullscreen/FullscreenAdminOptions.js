import React, {useState} from 'react'
import FsArtistForm from './FullscreenArtistForm'
import FsAdminForm from './FullscreenAdminForm'
import FsTattooRequestWindow from './FullscreenAdminTattooRequestWindow'

const FullscreenAdminOptions = (props) =>{

    return (
        <div className='full-screen'>
            <div className='fs-top-level'>
                <h1>Admin Options </h1>
                <span className='exit-x' onClick={props.toggle}>X</span> 
            </div>
           
            <div className='fs-top-level'>
                <FsTattooRequestWindow />
                <FsAdminForm />
            </div>
            <div className='fs-bot-level'>
                <FsArtistForm />
            </div>
        </div>
    )
}

export default FullscreenAdminOptions