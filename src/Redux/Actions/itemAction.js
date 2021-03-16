export const getAvailableItems = () => dispatch => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/items')
    .then(res => res.json())
    .then(data => dispatch({
        type : 'GET_ALL_AVAILABLE_ITEMS',
        payload : data 
    }))
    
}

export const getAllItems = () => dispatch => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/items')
        .then((res) => res.json())
        .then(data => dispatch ({
            type: 'FETCH_POST',
            payload:data
        })
        );
}
