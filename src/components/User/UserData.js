import React from 'react'

const UserData = (props) => {
    return(
        <div className="user-mod">
            <h1>Profile Info</h1>
            <h2>Name:{props.user.name}</h2>
            <h2>Email: {props.user.email}</h2>
            <h2>Phone: {props.user.phone_number}</h2>
            <div><h2>ID Image: <div><img className="id-preview" src={props.user.id_img_path} /></div></h2></div>
        </div>
    )
}

export default UserData