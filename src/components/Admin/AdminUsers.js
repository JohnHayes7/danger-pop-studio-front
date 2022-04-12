import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../actions/fetchUsers'
import { useEffect } from "react";
import { useDispatch} from 'react-redux'
import './adminusers.css'
import URL from '../Utilites/Url'
import NavBar from '../Nav/Navbar'

const AdminUsers = () =>{
    const [state, setState] = useState([])
    useEffect(() => {
        fetch(URL + '/users').then(response => response.json())
        .then(rxData => {
            setState(rxData)
        })
    },[])

    const parseAllUsers = () =>{
        return state.data ? state.data.map( p => <tr  key={p.id} className="user-attrs">
            <td>{p.id}</td>
            <td>{p.attributes.name}</td>
            <td>{p.attributes.email}</td>
            <td>{p.attributes.phone_number}</td>
            <td>{p.attributes.tattoo_approved ? "Yes" : "No"}</td>
            <td>{p.attributes.administrator ? "Yes" : "No"}</td>
        </tr>) : null
    }
    
    return(
        <div>
            <NavBar />
            <h1>All Users</h1>
            <table className="user-display">
                <tr>
                    <th>User ID:</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Tattoo Project Approved?</th>
                    <th>Admin?</th>
                </tr>
                {parseAllUsers()}
            </table>
            {/* <div className="user-display">{parseAllUsers()}</div> */}
        </div>
    )
}

export default AdminUsers

