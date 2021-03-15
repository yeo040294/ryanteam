//fetch items from firebase server

export const fetchItems = () => dispatch => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/items')
        .then((res) => res.json())
        .then(data => dispatch ({
            type: 'FETCH_POST',
            payload:data
        })
        );
}

export const fetchAllItems = () => dispatch => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/allItems')
        .then((res) => res.json())
        .then(data => dispatch ({
            type: 'FETCH_POST',
            payload:data
        })
        );
}

// export const fetchAllItems = () => dispatch => {
//     fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/allItems')
//             .then((res) => res.json())
//             .then(data => {
//             console.log(data)
//             this.setState({
//                 items : data
//             })
//             })
//             .catch((err) => console.log(err));
// }
