import firebase from '../Firebase/fbConfig'
import axios from 'axios'

export const getAvailableItems = () => dispatch => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/items')
        .then(res => res.json())
        .then(data => dispatch({
            type: 'GET_ITEMS',
            payload: data
        }))

}

export const adduser = (record) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection("users").add({
            ...record
        }).then(() => {
            dispatch({
                type: 'USER_ADD'
            })
        })
    }
}

export const donateItem = (record) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection("items").add({
            ...record
        }).then(() => {
            dispatch({
                type: 'ADD_ITEM'
            })
        })
    }
}

export const approveItem = (id) => dispatch => {
    const db = firebase.firestore()
    db.collection("items").doc(id).update({ itemStatus: 'Approved' })
    dispatch({
        type: "APPROVE_ITEM"
    })
}
export const updateItem = (id) => dispatch => {
    const db = firebase.firestore()
    db.collection("items").doc(id).update({ itemStatus: 'PendingCollection', recipient: localStorage.getItem("userhandle") })
    dispatch({
        type: "UPDATE_ITEM"
    })
}

export const collectItem = (id) => dispatch => {
    const db = firebase.firestore()
    db.collection("items").doc(id).update({ itemStatus: 'Collected' })
    dispatch({
        type: "COLLECT_ITEM"
    })
}

export const addRequest = (formdata) => dispatch => {
    const db = firebase.firestore()
    db.collection("requests").add({ ...formdata })
    dispatch({
        type: "ITEM_REQUEST"
    })
}
export const deleteItem = id => dispatch => {
    const db = firebase.firestore()
    db.collection("items").doc(id).delete()
    dispatch({
        type: "DELETE_ITEM",
        payload: data
    })
}

export const uploadItemImage = (formData) => (dispatch) => {
    dispatch({ type: 'LOADING_UI' });
    axios
      .post(`https://us-central1-secondlove-cc51b.cloudfunctions.net/api/item/image`, formData,
      {
          headers : {
            //Authorization : localStorage.FBIdToken
            Authorization : `Bearer ${localStorage.token}`
            }
      })
      .then((res) => {
        dispatch({
            type : 'SET_UPLOAD_IMG_LINK',
            payload : res.data
        })
        dispatch({type : 'CLEAR_LOADING_UI'})
      })
      .catch((err) => console.log(err));
  };




