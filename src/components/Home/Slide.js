import React from 'react'
import { css, jsx } from '@emotion/react'
import './home.css'

const Slide = ({ content }) => {
    // 
  return(
        <div className='slide'>
            <img src={content} alt="Tattoo and Art Display" />        
        </div>
        )
}

export default Slide