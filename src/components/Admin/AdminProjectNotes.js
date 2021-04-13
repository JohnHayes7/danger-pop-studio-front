import {React, useState} from 'react'

const AdminProjectNotes = (props) =>{

    const parseNotes = () =>{
       
        if(props.project.attributes.project_notes > 0){
            return (
                <div>
                    <li>
                        {props.project.attributes.project_notes.map(n => <li>{n.content}</li> )} 
                    </li>
                <div><button>Add A Note</button></div>
                </div>
                
            )
        }else{
            return (
                <div>
                    <div>There are no notes for this Project</div>
                    <div><button>Add a Note</button></div>
                </div>
            )
        }
    }


    return(
        <div>
            <div>{parseNotes()}</div>
        </div>
    )
}

export default AdminProjectNotes