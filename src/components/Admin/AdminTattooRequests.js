import {React, useState, useEffect} from 'react'
import './admintattoorequests.css'
import AdminTattooRequestDetails from './AdminTattooRequestDetails'
import AdminTattooRequest from './AdminTattooRequest'
import URL from '../Utilites/Url'
import NavBar from '../Nav/Navbar'

const AdminTattooRequests = () => {
    const [requests, setRequests] = useState([])
    const [showApproved, setShowApproved] = useState(false)
    
    // const [approvedRequests, setApproved]
    // const URL =  "https://danger-pop-api.herokuapp.com"
    useEffect(() => {
        fetch(URL + '/tattoo_requests').then(response => response.json())
        .then(rxData => {
        
            setRequests(rxData)

        })
    }, [] )

    const toggleButton = () => {
        
        return(
            <div className={`wrg-toggle ${showApproved ? 'wrg-toggle--checked' : ''}`} onClick={triggerToggle}>
                <div className="wrg-toggle-container">
                    <div className="wrg-toggle-check">
                        <span>Yes</span>
                    </div>
                    <div className="wrg-toggle-uncheck">
                        <span>No</span>
                    </div>
                </div>
                <div className="wrg-toggle-circle"></div>
                <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
            </div>
        )
    }

    const triggerToggle = () =>{
        setShowApproved(!showApproved)
    }




    const parseAllTattooRequests = () => {
        if(showApproved){
            return requests.data ? requests.data.map( tr => tr.attributes.declined != true ? <AdminTattooRequest key={tr.id} tr={tr}/> : null) : null
        }else{
            
            const notApproved = requests.data ? requests.data.filter(r => r.attributes.accepted === null) :null
            const notDeclined = requests.data? notApproved.filter(p => p.attributes.declined != true) : null
            return requests.data ? notDeclined.map(tr => <AdminTattooRequest key={tr.id} tr={tr} />) : null
        }
        
    }
        
    return(
        <div>
            <NavBar />
            <h1>Administrator Tattoo Requests Portal</h1>
            <div id="toggle-box">
                <div>Show Approved?</div>
                <div>{toggleButton()}</div><br></br>
            </div> 
           
            <div className="tattoo-request-panel">
                <div>{parseAllTattooRequests()}</div>
                
            </div>
            
        </div>
    )
}

export default AdminTattooRequests