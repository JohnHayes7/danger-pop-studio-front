import reactDom from "react-dom";
import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/fetchUsers'

const AdminAllUsers = () =>{

    return(
        <div>
            <h1>All Users</h1>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        users: state
    }
}

const mapDispatchToProps = dispatch =>({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminAllUsers)