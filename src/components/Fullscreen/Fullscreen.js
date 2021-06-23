import React, {useState} from 'react'
import FullscreenImage from './FullscreenImage'
import FullscreenProject from './FullscreenProject'
import FullscreenAdminOptions from './FullscreenAdminOptions'
import FullscreenRequest from './FulllscreenRequest'


const Fullscreen = (props) => {

    const [refreshState, setRefreshState] = useState(false)
    
    const propsType = () => {
        switch(props.type){
            case 'project': return typeProject();
            case 'image': return typeImage();
            case 'admin-options': return typeAdminOpts()
            case 'request' : return typeTattooRequest()
        }
    }

    const typeImage = () => <FullscreenImage toggle={props.toggle} imageSource={props.imageSource} />

    const typeProject = () => <FullscreenProject project={props.project} toggle={props.toggle} previous={props.previous} next={props.next}  />
    
    const typeAdminOpts = () => <FullscreenAdminOptions refreshState={refreshState} setRefreshState={setRefreshState} />

    const typeTattooRequest = () => <FullscreenRequest project={props.project} />
    
    return(
        <div>{propsType()}</div>
    )
    
}

export default Fullscreen