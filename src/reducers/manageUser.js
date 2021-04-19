export default function manageUser(state ={
    loading: false,
    all:[],
    id: 0,
    name: "",
    email: "",
    phonenumber:"",
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

        case 'DISPLAY_USER':
            debugger
            return state

        case 'CREATE_FAN':
            debugger
            return state
        
        
        case 'ALL_USERS':
            return state

        default:
            return state
    }
}