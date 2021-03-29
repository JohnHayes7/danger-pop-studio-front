export const fetchUsers = () => {
    return(dispatch) =>{
        fetch(`https://localhost:3001/users`).then(response => response.json())
        .then(rxData => {
            dispatch({type: 'ALL_USERS', users: rxData})
        })
    }
}