const initState = {
    items: [],
};

const ItemsReducers = (state = initState, action) => {
    switch(action.type){
        case 'FETCH_POST':
            return{
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}
export default ItemsReducers;