import React from 'react'
import Field from '../InputFields/Field'

const FsAdminForm = () =>{
    return(
        <div className='admin-option'>
            <h3>Add New Administrator</h3>
            <form> 
                <div className='admin-input-fields'>
                    <Field label='Administrator Email' id="email"/>
                    <Field label='password' id='password' />
                </div>
                <div className='submit-button'>
                    Create New Admin
                </div>
            </form>
        </div>
    )
}

export default FsAdminForm