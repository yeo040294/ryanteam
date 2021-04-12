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
    db.collection("items").doc(id).update({ itemStatus: 'Approved', approved : true })
    dispatch({
        type: "APPROVE_ITEM"
    })
    dispatch({
        type: "SET_MESSAGE",
        payload : ({message : "Item has been approved."})
    })
}

export const rejectItem = (id) => dispatch => {
    const db = firebase.firestore()
    db.collection("items").doc(id).update({ itemStatus: 'Rejected' })
    dispatch({type :'UPDATE_ITEM'})
    dispatch({
        type: "SET_MESSAGE",
        payload : ({message : "Item has been rejected."})
    })
}


export const updateItem = (id) => dispatch => {
    const db = firebase.firestore()
    db.collection("items").doc(id).update({ itemStatus: 'PendingCollection', recipient: localStorage.getItem("userhandle") })
    dispatch({
        type: "UPDATE_ITEM"
    })
}
//remove this shit
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

export const reserveItem = (itemId) => dispatch => {

    const db = firebase.firestore()
    // Code to add item name into collectionr reference
    // let itemName
    // db.collcetion('items').doc(itemId).get()
    // .then((doc)=>{
    //     itemName = doc.data().itemName
    // })
    // return

    db.collection('collectionReference').add({
        userId : localStorage.userid,
        userHandle : localStorage.getItem('userhandle'),
        itemId : itemId,
        createdAt : new Date().toISOString(),
        status : 'pendingCollection'
    })
    .then(() => {
        return db.collection('items').doc(itemId)
        .update({
            itemStatus : 'pendingCollection'
        })
    })
    .then(()=>{
        console.log("Item has been requested")
        dispatch({
            type: 'SET_MESSAGE',
            payload : ({message : 'Item has been successfully requested'})
        })
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        dispatch({
            type : 'SET_ERRORS', 
            payload : error
        })
    });
}

export const confirmItemCollection = (itemId) => dispatch => {
    const db = firebase.firestore()
    const itemDocument = db.doc(`/items/${itemId}`)
    let refId;
    itemDocument
        .update({
            itemStatus : 'Donated'
        })
    .then(() => {
        db.collection('collectionReference')
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                if(doc.data().itemId == itemId && doc.data().status == "pendingCollection"){
                    console.log("my doc id is = " + doc.id)
                    refId = doc.id                
                }
            })
            return db.collection('collectionReference').doc(refId)
            .update({
                status : 'Collected'
            })
            .then(()=>{
                dispatch({
                    type: 'SET_MESSAGE',
                    payload : ({message : 'Item has been successfully confirmed for donation'})
                })
                
                dispatch({
                    type : 'REMOVE_COLLECTION_REFERENCE_ITEM',
                    payload : refId
                })

                
            })
            
        })
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}


export const rejectItemCollection = (itemId) => dispatch => {
    const db = firebase.firestore()
    const itemDocument = db.doc(`/items/${itemId}`)
    let refId;
    itemDocument
        .update({
            itemStatus : 'Approved'
        })
    .then(() => {
        db.collection('collectionReference')
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                if(doc.data().itemId == itemId && doc.data().status == "pendingCollection"){
                    console.log("my doc id is = " + doc.id)
                    refId = doc.id                
                }
            })
            return db.collection('collectionReference').doc(refId)
            .update({
                status : 'notCollected'
            })
            .then(()=>{
                dispatch({
                    type: 'SET_MESSAGE',
                    payload : ({message : 'Reservation of item has been undone.'})
                })
                console.log("this is my refId; " + refId)
                dispatch({
                    type : 'REMOVE_COLLECTION_REFERENCE_ITEM',
                    payload : refId
                })
            })
            
        })
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export const getCollectionReference = () => dispatch => {
    dispatch({ type: 'LOADING_UI' });
    const collectionRefs = []
    const db = firebase.firestore()
    db.collection('collectionReference')
    .where('status', '==', 'pendingCollection')
    .get()
    .then((data)=>{
        data.forEach((doc) => {
            collectionRefs.push({
                refId : doc.id,
                createdAt : doc.data().createdAt,
                itemId : doc.data().itemId,
                status : doc.data().status,
                userId : doc.data().userId,
                userHandle : doc.data().userHandle
            })
        })

        dispatch({
            type : 'SET_LIST_OF_COLLECTION_REF',
            payload : collectionRefs
        })
        dispatch({type : 'CLEAR_LOADING_UI'})
    })
    .catch((error) => {
        console.error("Encountered this error: ", error);
    });
}