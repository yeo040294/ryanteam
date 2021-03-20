export const getAvailableItems = () => dispatch => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/items')
    .then(res => res.json())
    .then(data => dispatch({
        type : 'GET_ITEMS',
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

export const getAllUnapprovedItems = () => dispatch => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/unapprovedItems')
        .then((res) => res.json())
        .then(data => dispatch ({
            type: 'GET_ITEMS',
            payload:data
        })
        );
}

export const getItem = (matchUrl) => dispatch => {
    let arr = matchUrl.split("/") 
    let url = `https://us-central1-secondlove-cc51b.cloudfunctions.net/api/item/${arr[2]}`
    console.log("this is the url =" + url)
    fetch(url)
    .then((res) => res.json())
    .then(data => dispatch ({
        type : 'GET_ITEM',
        payload : data
    }))
}



