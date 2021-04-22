import {React, useState} from 'react'
import './createuserformcss.css'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'

import Field from '../InputFields/Field'



const CreateUser = (props) =>{
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [confirmUserPassword, setConfirmUserPassword] = useState("")
    // const [submitSuccess, setSubmitSuccess] = useState(false)

    const formData = {
        'user':{
            'name': fullName,
            "phone_number": phone,
            'email': userEmail,
            'password': userPassword,
        } 
    }

    let history = useHistory()

    const fullNameInput = (e) =>{
        e.preventDefault()
        setFullName(e.target.value)
    }

    const phoneInput = (e) =>{
        e.preventDefault()
        setPhone(e.target.value)
    }
    

    const userEmailInput = (e) =>{
        e.preventDefault()
        setUserEmail(e.target.value)
    }

    const userPasswordInput = (e) =>{
        e.preventDefault()
        setUserPassword(e.target.value)
    }

    const userConfirmPasswordInput = (e) =>{
        e.preventDefault()
        setConfirmUserPassword(e.target.value)
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:3001/users`, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
        // console.log("response", response)
        .then(rxData => {
            debugger
            // console.log(rxData)
            if(rxData){
                debugger
                localStorage.setItem('tk', rxData.token)
                localStorage.setItem('cu', rxData.id)
                props.displayUser(rxData)
                history.push(`/users/${rxData.id}`)
            }

        })   
    }

    

    


    return(
        <div className="create-new-user-form-parent">
            <h3>Create A DANGER POP Account</h3>
            <form onSubmit={e => submitHandler(e)}>
                <Field id="full-name" placeholder={'Enter Full Name'} fullName={fullName} changeHandler={e => fullNameInput(e)} /> <br></br>
                <Field id='phone' placeholder ={'Enter Phone #'} phone={phone}  changeHandler={e=> phoneInput(e)} /><br></br>
                <Field id='email' placeholder={'Enter Email'} userEmail={userEmail} changeHandler={e=> userEmailInput(e)} /><br></br>
                <Field id='password' placeholder={'Enter Password'} userPassword={userPassword} changeHandler={e=> userPasswordInput(e)} /><br></br>
                <Field id='password' placeholder={'Confirm Password'} confirmUserPassword={confirmUserPassword} changeHandler={e=> userConfirmPasswordInput(e)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch =>({
    displayUser: formData => dispatch({type: "DISPLAY_USER", user:formData})
})

export default connect(0, mapDispatchToProps)(CreateUser)

// export default connect(0, mapDispatchToProps)(CreateUser)