import {React, useState} from 'react'
import Field from '../InputFields/Field'
import axios from 'axios'

const AdminProjectNoteForm = (props) =>{

    const [noteContent, setNoteContent] = useState('')

    const noteInput = (e) => setNoteContent(e.target.value)

    const adminProjectNoteSubmitHandler = (e) =>{
        e.preventDefault()
        const noteData = {
            "project_id": props.project.id,
            "content": noteContent
        }
        axios({method: 'post', url: `http://localhost:3001/project_notes`, data: noteData,   headers: {'Content-Type': 'application/json'}}).then(resp => {
            console.log(resp)
          }).catch( err => {  
            //catch the error
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