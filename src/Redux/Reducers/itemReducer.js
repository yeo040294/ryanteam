const initState = {
    items : [],
    selectedItem : [],
    collectionPoints : [],
    requestList : [],
    donationList : [],
    searchKeyword : '',
    searchList : [],
    loading : false
}

const itemReducers = (state = initState, action) => {

    switch(action.type){
        case 'GET_ITEMS':
            return{
                ...state,
                items: action.payload,
                loading : false
            }

        case 'GET_ITEM':
            return{
                ...state,
                selectedItem : action.payload,
                loading : false
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
                loading: false,
                requestList : action.payload
            }

        case 'SET_DONATION_LIST':
            return{
                ...state,
                loading: false,
                donationList : action.payload
            }

        case 'SET_ITEM_REDUCER_INIT' :
            return {
                items : [],
                selectedItem : [],
                collectionPoints : [],
                requestList : [],
                donationList : []
            }

        case 'SET_SEARCH_KEYWORD' : 
            return {
                ...state,
                searchKeyword : action.payload
            }

        case 'LOADING_ITEMS':
            return {
                ...state,
                loading: true
            };
        case 'CLEAR_LOADING':
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
export default itemReducers;