import React, {useState, useEffect} from 'react'
import axios from 'axios'
import URL from '../Utilites/Url'
import Field from '../InputFields/Field'

const AdminProjectInfoModule = (props) =>{

    const[projectComplete, setProjectComplete] = useState(false)
    const[depositReceived, setDepositReceived] = useState(false)
    const[showTotalsEditForm, setShowTotalsEditForm] = useState(false)
    const[totalAdjustment, setTotalAdjustment] = useState(0)
   

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
       
        updateProjectInDb(cat, e.target.textContent)
    }

    const depositClickHandler = (e) =>{
        setDepositReceived(!depositReceived)
        let cat = e.currentTarget.parentElement.parentElement.innerText.split(" ")[0]
        updateProjectInDb(cat, e.target.textContent)   
    }

    const editProjectTitleForm = () => {
        return (
            <form>
                {/* <Field id="title" newProjectTitle={newProjectTitle} changeHandler={e => titleInput(e)} placeholder={project.attributes.title} />
                <button className="edit-proj-title" onClick={e => updateTitle(e)}>Save</button>
                <button className="edit-proj-title" onClick={toggleTitleForm}>Cancel</button> */}
            </form>
        )
    }

    const totalsDisplay = () => {
        debugger
        return(
            <div id='total-display'>
                {!!props.project.attributes.price ? props.project.attributes.price : "Update Project Total"}<button onClick={toggleTotalEditForm} className="edit-proj-total">Edit</button>
            </div>
        )
    }

    const toggleTotalEditForm = () => setShowTotalsEditForm(!showTotalsEditForm)
    
    const totalsEditForm = () => {
       return(
            <div className='totals-edit-form'>
                <Field id="price"  totalAdjustment={totalAdjustment} changeHandler={e => adjustmentInput(e)} placeholder="Adjust price"/> 
                <img onClick={ e=> plusMinusClick(e)} data-id={'plus'} classname='plus-minus' src='https://danger-pop-studio.s3.amazonaws.com/projects/plussign.png' alt='plus sign' />
                <img onClick={e=> plusMinusClick(e)} data-id={'minus'} classname='plus-minus' src='https://danger-pop-studio.s3.amazonaws.com/projects/MinusSign.png' alt='plus sign' />
            </div>
       )
    }

    const adjustmentInput = (e) => setTotalAdjustment(e.target.value)

    const plusMinusClick = (e) => {
        return(
           <div>clicked</div>
            )
    }

    


    

    return(
        <div className='left-align'>
            <div className='left-item'>Total: <div className='right-inputs'>{totalsDisplay()}</div></div> 
            {showTotalsEditForm ? totalsEditForm() : null}
            <div className='left-item'>Deposit Received? <div className="right-inputs">{depositToggleButton()}</div></div>
            <div className='left-item'>Project Complete? <div className="right-inputs">{completedToggleButton()}</div></div>
           
            <div className='left-item'>Materials Used:</div>
        </div>
    )
}

export default AdminProjectInfoModule