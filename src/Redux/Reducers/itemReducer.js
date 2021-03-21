const initState = {
    items : [],
    selectedItem : []
}

const itemReducers = (state = initState, action) => {

    switch(action.type){
        case 'GET_ITEMS':
            return{
                ...state,
                items: action.payload
            }

        case 'GET_ITEM':
            return{
                ...state,
                selectedItem : action.payload
            }
        default:
            return state;
    }
}
export default itemReducers;