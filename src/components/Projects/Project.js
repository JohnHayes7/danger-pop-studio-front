import {React, useState, useEffect} from 'react'

const Project = (props) => {
    const [state, setState] = useState([])
    // const [pageId, setPageId] = useState("")

    const pageId = props.location.pathname.split('/').splice(-1)

    useEffect(() => {
        // setPageId()
        fetch(`http://localhost:3001/projects/${pageId}`).then(response => response.json())
        .then(rxData => {
            // console.log(rxData)
            setState(rxData)
            console.log(state)
        })
    }, [])

    return(
        <div>
            <h1>Danger Pop Administrator Project Page</h1>
        </div>
    )
}

export default Project