import React from 'react'
import './admin-style.css'
const AdminPortal = () =>{
    return(
        <div>
            <h1>Administrator Portal</h1>
            <div className="admin-options">
                <div className="options-rows">
                    <div className="option">
                        <div className="selectable-label">Users</div>
                    </div>
                    <div className="option">
                        <div className="selectable-label">Appointments</div>
                    </div>
                </div>
                <div className="options-rows">
                    <div className="option">
                        <div className="selectable-label">Projects</div>
                    </div>
                    <div className="option">
                        <div className="selectable-label">Tattoo Requests</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPortal