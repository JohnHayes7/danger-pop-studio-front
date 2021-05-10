import {React, useState, useEffect} from 'react'
import './admintattoorequests.css'
import AdminTattooRequestDetails from './AdminTattooRequestDetails'
import AdminTattooRequest from './AdminTattooRequest'

const AdminTattooRequests = () => {
    const [requests, setRequests] = useState([])
    // const [approvedRequests, setApproved]
   
    useEffect(() => {
        fetch('http://localhost:3001/tattoo_requests').then(response => response.json())
        .then(rxData => {
        
            setRequests(rxData)

        })
    }, [] )




    const parseAllTattooRequests = () => requests.data ? requests.data.map( tr => <AdminTattooRequest key={tr.id} tr={tr}/>) : null
        
        
    return(
        <div>
            <h1>Administrator Tattoo Requests Portal</h1>
            <div className="tattoo-request-panel">
                <div>{parseAllTattooRequests()}</div>
                
            </div>
            
        </div>
    )
}

export default AdminTattooRequests