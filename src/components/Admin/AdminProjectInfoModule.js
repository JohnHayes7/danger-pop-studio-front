import React, {useState, useEffect} from 'react'
import axios from 'axios'
import URL from '../Utilites/Url'
import Field from '../InputFields/Field'

const AdminProjectInfoModule = (props) =>{

    const[projectComplete, setProjectComplete] = useState(false)
    const[depositReceived, setDepositReceived] = useState(false)
    const[showTotalsEditForm, setShowTotalsEditForm] = useState(false)
    const[showPriceChangeConfirmation, setShowPriceChangeConfirmation] = useState(false)
    const[showEditPriceButton, setShowEditPriceButton] = useState(true)
    const[totalAdjustment, setTotalAdjustment] = useState(0)
    const[operator, setOperator] = useState(null)
    const[refreshKey, setRefreshKey] = useState(0)
    const[updatedPrice, setUpdatedPrice] = useState(0)
   

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
        // debugger
        return(
            <div id='total-display'>
                {!!props.project.attributes.price ? `$${props.project.attributes.price}` : "Please Input Project Price"}
                {showEditPriceButton ? <button onClick={toggleTotalEditForm} className="edit-proj-total">Edit</button> : null}
            </div>
        )
    }

    const toggleTotalEditForm = () => {
        
        setShowTotalsEditForm(!showTotalsEditForm)
        setShowEditPriceButton(false)
    }
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
        setOperator(e.target.dataset.id)
        // debugger
        if(operator === 'plus'){
            // debugger
            const newPrice = parseInt(totalAdjustment) + props.project.attributes.price
            setUpdatedPrice(newPrice)
            toggleTotalEditForm()
            setShowPriceChangeConfirmation(true)
            confirmPriceChange()
           
        }else if(operator === 'minus'){
            // debugger
            const newPrice = props.project.attributes.price - parseInt(totalAdjustment)
            if(newPrice < 0){
                alert('Your new total is a negative number please ensure you meant to subtract and not add this number')
            }else{
                setUpdatedPrice(newPrice) 
                toggleTotalEditForm()
                setShowPriceChangeConfirmation(true)
                confirmPriceChange()
            }
           
        }
        

    }

    // const toggleConfirmPriceChange = () => setShowPriceChangeConfirmation(!showPriceChangeConfirmation)

    const confirmPriceChange = () =>{
        const addResponse = `Are you sure you want to add $${totalAdjustment} to the project.  The new total will be $${updatedPrice}`
        const subResponse = `Are you sure you want to subtract $${totalAdjustment} from the project.  The new total will be $${updatedPrice}`
        return (
                    <div className='confirm-price'>
                        {operator === 'plus' ? addResponse : subResponse}
                        <button onClick={postPriceToDb} className="edit-proj-total">Save</button>
                        <button onClick={resetPriceForm} className="edit-proj-total">Cancel</button>
                    </div>
                )
    
    }

    const postPriceToDb = () => {
        const projectData = {}
        projectData["project_id"] = props.project.id
        projectData["updated_price"] = updatedPrice

        // debugger
        axios({method: 'patch', url: `${URL}/projects/${props.project.id}`, data: projectData,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            refreshComponent()
          }).catch( err => {  
            console.log(err)
          })
    }

    const resetPriceForm = () => {
        setShowEditPriceButton(true)
        setShowTotalsEditForm(false)
        setShowPriceChangeConfirmation(false)
    }

    const refreshComponent = () =>{
       return window.location.reload(false)
    }

    

    


    

    return(
        <div  className='left-align'>
            <div className='left-item'>Total: <div className='right-inputs'>{totalsDisplay()}</div></div> 
            {showTotalsEditForm ? totalsEditForm() : null}
            {showPriceChangeConfirmation ? confirmPriceChange() : null}
            <div className='left-item'>Deposit Received? <div className="right-inputs">{depositToggleButton()}</div></div>
            <div className='left-item'>Project Complete? <div className="right-inputs">{completedToggleButton()}</div></div>
           
            <div className='left-item'>Materials Used:</div>
        </div>
    )
}

export default AdminProjectInfoModule