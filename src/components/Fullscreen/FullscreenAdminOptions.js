import React, {useState} from 'react'
import FsArtistForm from './FullscreenArtistForm'
import FsAdminForm from './FullscreenAdminForm'
import FsTattooRequestWindow from './FullscreenAdminTattooRequestWindow'

const FullscreenAdminOptions = () =>{

    return (
        <div className='full-screen'>
            <h1>Admin Options</h1>
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