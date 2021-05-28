import {React, useState }from 'react'
import './togglecss.css'



const ToggleButton = () => {
    const [toggle, setToggle] = useState(false)

    const triggerToggle = () =>{
        setToggle(!toggle)
    }

    return(
        <div className="wrg-toggle" onChange={triggerToggle}>
            <div className="wrg-toggle-container">
                <div className="wrg-toggle-check">
                    <span>🌜</span>
                </div>
                <div className="wrg-toggle-uncheck">
                    <span>🌞</span>
                </div>
            </div>
            <div className="wrg-toggle-circle"></div>
            <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
        </div>
    )
}

export default ToggleButton;