import React from 'react'
import './admin-style.css'
import { Link } from 'react-router-dom'

const AdminPortal = () =>{

    
    return(
        <div>
            <h1>Administrator Portal</h1>
            <div className="admin-options">
                <div className="options-rows">
                    <Link to={'/admin/users'}>
                        <div className="option">
                            <div className="selectable-label"> Users</div>
                        </div>
                    </Link>
                    <Link to={'/admin/appts'}>
                        <div className="option">
                            <div className="selectable-label">Appointments</div>
                        </div>
                    </Link>
                </div>
                <div className="options-rows">
                    <Link to={'/admin/projects'}>
                        <div className="option">
                            <div className="selectable-label">Projects</div>
                        </div>
                    </Link>
                    <Link to={'/admin/tattoo-requests'}>
                        <div className="option">
                            <div className="selectable-label">Tattoo Requests</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminPortal