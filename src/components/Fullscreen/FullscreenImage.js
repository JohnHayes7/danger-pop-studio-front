import React from 'react'

const FullscreenImage = (props) =>{

    return( 
        <div className="full-screen" onClick={props.toggle}>
            <img className="fs-image" src={props.imageSource} alt='body image' />
            

        </div>
    )
}

export default FullscreenImage
