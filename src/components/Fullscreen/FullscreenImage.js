import React from 'react'

const FullscreenImage = (props) =>{

    return( 
        <div className="full-screen">
            <div><span className='exit-x' onClick={props.toggle}>X</span> </div>
            <img className="fs-image" src={props.imageSource} alt='body image' />
        </div>
    )
}

export default FullscreenImage
