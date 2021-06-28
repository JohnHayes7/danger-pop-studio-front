import React, {useState, useEffect} from 'react'
import axios from 'axios'

const AdminProjectInfoModule = (props) =>{

    const[projectComplete, setProjectComplete] = useState(false)
    const[depositReceived, setDepositReceived] = useState(false)

    useEffect(() => {
        props.project.attributes.project_complete_status === true ? setProjectComplete(true) : setProjectComplete(false)
    }, [])


    const completedToggleButton = () => {
       
        return(
            <div className={`wrg-toggle ${projectComplete ? 'wrg-toggle--checked' : ''}`} onClick={e => clickHandler(e)} >
                {toggleYesNo()}
                <div className="wrg-toggle-circle"></div>
                <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
            </div>
        )
    }

    const depositToggleButton = () => {
        return(
            <div className={`wrg-toggle ${depositReceived ? 'wrg-toggle--checked' : ''}`} onClick={e => clickHandler(e)} >
                {toggleYesNo()}
                <div className="wrg-toggle-circle"></div>
                <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
            </div>
        )
    }

    const toggleYesNo = () => {
        debugger
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

    const updateProjectInDb = (saveIndicator) =>{
        let completed  = saveIndicator === "No" ? true : false
        const projectData = {
            "project_id": props.project.id,
            "completed_status": completed
        }
        
        axios({method: 'patch', url: `http://localhost:3001/projects/${props.project.id}`, data: projectData,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            setProjectComplete(resp.data.data.attributes.project_complete_status)
          }).catch( err => {  
            console.log(err)
          })
        
    }

    const clickHandler = (e) =>{
        setProjectComplete(!projectComplete)
        updateProjectInDb(e.target.textContent)
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