const initState = {
    categories: [],
    listOfCollectionRefs : []
}

const itemReducers = (state = initState, action) => {
    //hyunatic can you tell him not to return state with 10 diff action types?
    switch (action.type) {
        case 'GET_ITEMS':
            return {
                ...state,
                items: action.payload
            }
        case 'UPDATE_ITEM':
            return {
                ...state,
            }

        case 'COLLECT_ITEM':
            return {
                ...state,
            }
        case 'APPROVE_ITEM':
            return {
                ...state,
            }
        case 'SEARCH_ITEM':
            return {
                ...state,
                categories: action.payload
            }
        case 'ITEM_REQUEST':
            return {
                ...state,
            }
        case 'ADD_ITEM':
            return {
                ...state,
            }
        case 'FETCH_POST':
            return {
                ...state,
            }
        case 'GET_COLLECTION_POINTS':
            return {
                ...state,
            }
        case 'SET_LIST_OF_COLLECTION_REF':
            return{
                ...state,
                listOfCollectionRefs : action.payload
            }
        case 'REMOVE_COLLECTION_REFERENCE_ITEM':
            return {
                ...state,
                listOfCollectionRefs : state.listOfCollectionRefs.filter(ref => ref.refId !== action.payload)
            }
        default:
            return state;
    }
}
export default itemReducers;