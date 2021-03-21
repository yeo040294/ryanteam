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

export const getAllBallotItems = () => dispatch => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/ballotItems')
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
    fetch(url)
    .then((res) => res.json())
    .then(data => dispatch ({
        type : 'GET_ITEM',
        payload : data
    }))
}

export const requestItem = (matchUrl) => dispatch => {
    let arr = matchUrl.split("/") 
    let url = `https://us-central1-secondlove-cc51b.cloudfunctions.net/api/item/${arr[2]}/request`
    fetch(url,{
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.FBIdToken
        },
    })
    .then((res) => {
        if(!res.ok) throw res;
        return res.json();
    })
    .then(data => {
        dispatch ({
            type : 'SET_MESSAGE',
            payload : data
        })
        dispatch({type : 'CLEAR_ERRORS'})
    })
    .catch((err) => {
        console.log(err)
        err.json().then((body)=>{
            dispatch({
                type : 'SET_ERRORS',
                payload : body
            })
        })
    });

}

export const unrequestItem = (itemId) => dispatch => {
    fetch(`https://us-central1-secondlove-cc51b.cloudfunctions.net/api/item/${itemId}/unrequest`,
    {
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.FBIdToken
        }
    })
    .then((res) => {
        if(!res.ok) throw res;
        return res.json();
    })
    .then(data => {
        dispatch ({
            type : 'SET_MESSAGE',
            payload : data
        })
        dispatch({type : 'CLEAR_ERRORS'})
    })
    .catch((err) => {
        console.log(err)
        err.json().then((body)=>{
            dispatch({
                type : 'SET_ERRORS',
                payload : body
            })
        })
    });

}

export const approveItem = (itemId) => dispatch => {
    fetch(`https://us-central1-secondlove-cc51b.cloudfunctions.net/api/item/${itemId}/approve`,
    {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.FBIdToken
        }
    })
    .then((res) => {
        if(!res.ok) throw res;
        return res.json();
    })
    .then(data => {
        dispatch ({
            type : 'SET_MESSAGE',
            payload : data
        })
        dispatch({type : 'CLEAR_ERRORS'})
    })
    .catch((err) => {
        console.log(err)
        err.json().then((body)=>{
            dispatch({
                type : 'SET_ERRORS',
                payload : body
            })
        })
    });
}


export const ballotItem = (itemId) => dispatch => {
    fetch(`https://us-central1-secondlove-cc51b.cloudfunctions.net/api/item/${itemId}/ballotItem`,
    {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.FBIdToken
        }
    })
    .then((res) => {
        if(!res.ok) throw res;
        return res.json();
    })
    .then(data => {
        dispatch ({
            type : 'SET_MESSAGE',
            payload : data
        })
        dispatch({type : 'CLEAR_ERRORS'})
    })
    .catch((err) => {
        console.log(err)
        err.json().then((body)=>{
            dispatch({
                type : 'SET_ERRORS',
                payload : body
            })
        })
    });
}

export const searchItems = (searchData, history) => dispatch => {
    let itemResults = {}
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/item/search',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchData)
    })
        .then((res) => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then((data) => {  
            dispatch ({
                type: 'GET_ITEMS',
                payload:data
            })
        })
        .catch((err) => {
            console.log(err)
            err.json().then((body)=>{
                dispatch({
                    type : 'SET_ERRORS',
                    payload : body
                })
            })
        });
}

