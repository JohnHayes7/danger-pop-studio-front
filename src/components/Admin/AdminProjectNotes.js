import {React, useState} from 'react'
import AdminProjectNoteForm from './AdminProjectNoteForm'
import './adminprojectnoteformcss.css'
import axios from 'axios'
import {refresh} from './AdminProjectNoteForm'

const AdminProjectNotes = (props) =>{

    const [showProjNoteForm, setShowProjNoteForm] = useState(false)

    const toggleProjectNotesForm = () => setShowProjNoteForm(!showProjNoteForm)

    const deleteNote = (e) =>{
        e.preventDefault()
        deleteNoteFromDb(e.currentTarget.dataset.id)
    }

    const deleteNoteFromDb = (id) =>{
        axios({method: 'DELETE', url: `http://localhost:3001/project_notes/${id}`,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            console.log(resp)
            // refresh()
          }).catch( err => {  
            //catch the error
            console.log(err)
          })
    }

   
    const parseNotes = () =>{
       debugger
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
            <div><button  onClick={toggleProjectNotesForm}>Add a Note</button></div>
            {showProjNoteForm ? <AdminProjectNoteForm project={props.project}/> : null}
        </div>
    )
}

export default AdminProjectNotes