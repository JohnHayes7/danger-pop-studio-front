import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/fetchUsers'
import { useEffect } from "react";
import { useDispatch} from 'react-redux'
import './adminusers.css'

const AdminUsers = () =>{
    const [state, setState] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/users').then(response => response.json())
        .then(rxData => {
            setState(rxData)
        })
    },[])

    const parseAllUsers = () =>{
        debugger
        return state.data ? state.data.map( p => <div  key={p.id}className="user-attrs">
            <div>Name: {p.attributes.name}</div>
            <div>User Id: {p.id}</div>
            <div>Email: {p.attributes.email}</div>
            <div>Phone: {p.attributes.phone_number}</div>
            <div>Tattoo Approved? {p.attributes.tattoo_approved ? "Yes" : "No"}</div>
            <div>Administrator? {p.attributes.administrator ? "Yes" : "No"}</div>
        </div>) : null
    }

    debugger
    return(
        <div>
            <h1>All Users</h1>
            <div className="user-display">{parseAllUsers()}</div>
        </div>
    )
}

export default AdminUsers

