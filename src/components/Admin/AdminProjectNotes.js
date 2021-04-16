import {React, useState} from 'react'
import AdminProjectNoteForm from './AdminProjectNoteForm'
import './adminprojectnoteformcss.css'

const AdminProjectNotes = (props) =>{

    const [showProjNoteForm, setShowProjNoteForm] = useState(false)

    const toggleProjectNotesForm = () => setShowProjNoteForm(!showProjNoteForm)

   
    const parseNotes = () =>{
       debugger
        if(props.project.attributes.project_notes.length > 0){
            return (
                <div>
                    <li>
                        {props.project.attributes.project_notes.map(n => <li>{n.content}</li> )} 
                    </li>
                </div>
            )
        }else{
            return (
                <div>
                    <div>There are no notes for this Project</div>
                </div>
            )
        }
    }


    return(
        <div id="notes">
            <div>{parseNotes()}</div>
            <div><button  onClick={toggleProjectNotesForm}>Add a Note</button></div>
            {showProjNoteForm ? <AdminProjectNoteForm project={props.project}/> : null}
        </div>
    )
}

export default AdminProjectNotes