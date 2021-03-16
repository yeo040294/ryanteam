const initState = {
    authenticated : false,
    credentials : {},
    requests : [],
    notifications : []
}

const userReducers = (state = initState, action) => {
    switch(action.type){
        case 'SET_AUTHENTICATED': 
            return{
                ...state,
                authenticated : true
            }

        case 'SET_UNAUTHENTICATED':
            return initState

        case 'SET_USER':
            return{
                authenticated : true,
                ...action.payload
            }
        default:
            return state;
    }
}
export default userReducers;