export const fetchUsers = () => {
    // console.log(dispatch)
    return(dispatch) =>{
        dispatch({type: 'LOADING_ALL_USERS'})
       
        fetch(`https://localhost:3001/users`).then(response => response.json())
        .then(rxData => {
            dispatch({type: 'ALL_USERS', users: rxData})
        })
    }
    
}