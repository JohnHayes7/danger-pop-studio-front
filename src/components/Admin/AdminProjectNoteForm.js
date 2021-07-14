import {React, useReducer, useState} from 'react'
import Field from '../InputFields/Field'
import axios from 'axios'
import Refresh from '../Utilites/Refresh'
import URL from '../Utilites/Url'

const AdminProjectNoteForm = (props) =>{

    const [noteContent, setNoteContent] = useState('')

    // const URL = "https://danger-pop-api.herokuapp.com"
    
    const noteInput = (e) => setNoteContent(e.target.value)

    const adminProjectNoteSubmitHandler = (e) =>{
        e.preventDefault()
        const noteData = {
            "project_id": props.project.id,
            "content": noteContent
        }
        axios({method: 'post', url: `${URL}/project_notes`, data: noteData,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            console.log(resp)
            Refresh()
          }).catch( err => {  
            console.log(err)
          })
    }

    return(
        <div>
            <form onSubmit={e => adminProjectNoteSubmitHandler(e)}>
                <Field id="note-text"  noteContent={noteContent} changeHandler={e => noteInput(e)} placeholder="Add Note Here"/>
                <button>Save</button>
            </form>
        </div>
    )
}

export default AdminProjectNoteForm
