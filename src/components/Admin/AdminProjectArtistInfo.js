import React from 'react'

const AdminProjectArtistInfoModule = (props) =>{
    if(props.project.attributes.artist){
        return <div>Max is the artist</div>
    }else{
        return <div>You Need to Assign an Artist to this project</div>
    }
}

export default AdminProjectArtistInfoModule