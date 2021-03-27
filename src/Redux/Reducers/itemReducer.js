const initState = {
    items : [],
    selectedItem : [],
    collectionPoints : [],
    requestList : []
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
        case 'SET_REQUEST_LIST':
            return{
                ...state,
                requestList : action.payload
            }

        case 'SET_ITEM_REDUCER_INIT' :
            return {
                items : [],
                selectedItem : [],
                collectionPoints : [],
                requestList : []
            }
        default:
            return state;
    }
}
export default itemReducers;