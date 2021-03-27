const initState = {
    items : [],
    selectedItem : [],
    collectionPoints : []
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
        
        case 'GET_COLLECTION_POINTS':
            return{
                ...state,
                collectionPoints : action.payload
            }
        case 'CLEAR_SELECTED_ITEM':
            return{
                ...state,
                selectedItem : []
            }
        default:
            return state;
    }
}
export default itemReducers;