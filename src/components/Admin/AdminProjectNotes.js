import {React, useState} from 'react'
import AdminProjectNoteForm from './AdminProjectNoteForm'
import './adminprojectnoteformcss.css'
import axios from 'axios'
import Refresh from '../Utilites/Refresh'
import URL from '../Utilites/Url'


const AdminProjectNotes = (props) =>{

    const [showProjNoteForm, setShowProjNoteForm] = useState(false)
    // const [projectNotes, setProjectNotes] = useState(props.project.attributes.project_notes)
    let noteText = showProjNoteForm ? "Hide Note Form" : "Add Note"

    const toggleProjectNotesForm = () => setShowProjNoteForm(!showProjNoteForm)
   
    // const URL = "https://danger-pop-api.herokuapp.com"

    const deleteNote = (e) =>{
        e.preventDefault()
        deleteNoteFromDb(e.currentTarget.dataset.id)
    }

    const deleteNoteFromDb = (id) =>{
        axios({method: 'DELETE', url: `${URL}/project_notes/${id}`,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            console.log(resp)
            Refresh()
          }).catch( err => {  
            //catch the error
            console.log(err)
          })
    }

   
    const parseNotes = () =>{
       
        if(props.project.attributes.project_notes.length > 0){
            return (
                <div>
                    <ul>
                        {props.project.attributes.project_notes.map(n => <li key={n.id}><div>{n.content}<div data-id={n.id}className="edit-note-button" onClick={e => deleteNote(e)}>X</div></div></li> )} 
                    </ul>
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
            <div><button  onClick={toggleProjectNotesForm}>{noteText}</button></div>
            {showProjNoteForm ? <AdminProjectNoteForm project={props.project}/> : null}
        </div>
    )
}

export default AdminProjectNotes