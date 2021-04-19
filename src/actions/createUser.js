export const createNewUser = (userData) => {
    debugger
    // console.log(dispatch)
    return(dispatch) =>{
        // dispatch({type: 'LOADING_ALL_USERS'})
        fetch(`http://localhost:3001/users`, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(response => response.json())
        .then(rxData => {
            debugger
            dispatch({type: 'DISPLAY_USER', user: rxData})
        })
    }
    
}