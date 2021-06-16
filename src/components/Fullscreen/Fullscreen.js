import React, {useState} from 'react'
import FullscreenImage from './FullscreenImage'
import FullscreenProject from './FullscreenProject'
import FullscreenAdminOptions from './FullscreenAdminOptions'


const Fullscreen = (props) => {
    
    const propsType = () => {
        switch(props.type){
            case 'project': return typeProject();
            case 'image': return typeImage();
            case 'admin-options': return typeAdminOpts()
        }
    }

    const typeImage = () => <FullscreenImage toggle={props.toggle} imageSource={props.imageSource} />

    const typeProject = () => <FullscreenProject project={props.project} toggle={props.toggle} previous={props.previous} next={props.next}  />
    
    const typeAdminOpts = () => <FullscreenAdminOptions />

    return(
        <div>{propsType()}</div>
    )
    
}

export default Fullscreen