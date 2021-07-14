import React, {useState, useEffect} from 'react'
import axios from 'axios'

const AdminProjectInfoModule = (props) =>{

    const[projectComplete, setProjectComplete] = useState(false)
    const[depositReceived, setDepositReceived] = useState(false)
    const URL = "https://danger-pop-api.herokuapp.com"

    useEffect(() => {
        props.project.attributes.project_complete_status === true ? setProjectComplete(true) : setProjectComplete(false)
        props.project.attributes.deposit_received_status === true ? setDepositReceived(true) : setDepositReceived(false)
    }, [])


    const completedToggleButton = () => {
       
        return(
            <div className={`wrg-toggle ${projectComplete ? 'wrg-toggle--checked' : ''}`} onClick={e => completedClickHandler(e)} >
                {toggleYesNo()}
                <div className="wrg-toggle-circle"></div>
                <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
            </div>
        )
    }

    const depositToggleButton = () => {
        return(
            <div className={`wrg-toggle ${depositReceived ? 'wrg-toggle--checked' : ''}`} onClick={e=> depositClickHandler(e)} >
                {toggleYesNo()}
                <div className="wrg-toggle-circle"></div>
                <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
            </div>
        )
    }

    const toggleYesNo = () => {
       return (
            <div className="wrg-toggle-container">
                <div className="wrg-toggle-check">
                    <span>Yes</span>
                </div>
                <div className="wrg-toggle-uncheck">
                    <span>No</span>
                </div>
            </div>
       ) 
    }

    const updateProjectInDb = (catIndicator, valIndicator) =>{

        const projectData = {}
        if(catIndicator === "Project"){
            let completed  = valIndicator === "No" ? true : false
            projectData["project_id"] = props.project.id
            projectData["completed_status"] = completed
            
        }else if(catIndicator === "Deposit"){
            let received = valIndicator === "No" ? true : false
            projectData["project_id"] = props.project.id
            projectData["deposit_received"] = received
        }
        
        
        axios({method: 'patch', url: `${URL}/projects/${props.project.id}`, data: projectData,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            setProjectComplete(resp.data.data.attributes.project_complete_status)
          }).catch( err => {  
            console.log(err)
          })
        
    }

    const completedClickHandler = (e) =>{
        setProjectComplete(!projectComplete)
        let cat = e.currentTarget.parentElement.parentElement.innerText.split(" ")[0]
        debugger
        updateProjectInDb(cat, e.target.textContent)
    }

    const depositClickHandler = (e) =>{
        setDepositReceived(!depositReceived)
        let cat = e.currentTarget.parentElement.parentElement.innerText.split(" ")[0]
        updateProjectInDb(cat, e.target.textContent)   
    }

    return(
        <div className='left-align'>
            <div className='left-item'>Deposit Received? <div className="right-inputs">{depositToggleButton()}</div></div>
            <div className='left-item'>Project Complete? <div className="right-inputs">{completedToggleButton()}</div></div>
            <div className='left-item'>Total:</div>
            <div className='left-item'>Materials Used:</div>
        </div>
    )
}

export default AdminProjectInfoModule