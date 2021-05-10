export default function manageUser(state ={
    id: 0,
    name: "",
    email: "",
    phone_number:"",
    address:"",
    admin: false,
    tattooapproved: false,
    id_img_path:"",
    allergies: "",
    cart:{},
    products:[],
    projects:[],
    tattoo_requests:[],
    appointments:[],
    loggedIn: false,
}, action) {
    switch(action.type){
        
        case 'LOADING_USER':
            return {
                ...state,
                loading: true
            }

        case 'CURRENT_USER':
            const currentUser = {
                id: action.user.id,
                name: action.user.name,
                email: action.user.email,
                phone_number: action.user.phone_number
                // ADD PHONE
            }
            return Object.assign({}, state, currentUser)

        case 'CREATE_FAN':
            return state
        
        
        case 'ALL_USERS':
            return state

        default:
            return state
    }
}