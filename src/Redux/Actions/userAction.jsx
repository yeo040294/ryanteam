import firebase from '../Firebase/fbConfig'
import axios from 'axios'

export const loginUser = (userData) => dispatch => {
    
     fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/login',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((res) => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then(data => {
            dispatch({
                type: 'SET_AUTHENTICATED',
                payload: data
            })
            dispatch({type : 'CLEAR_ERRORS'})
        })
        .catch((err) => {
            err.json().then((body)=>{
                dispatch({
                    type : 'SET_ERRORS',
                    payload : body
                })
            })
        });
}

export const getUserData = (userId) => (dispatch) => {
    dispatch({ type: 'LOADING_USER' });
    let userCredentials = {};
    const db = firebase.firestore()
    db.collection("users")
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
            if(doc.data().userId === userId){
                userCredentials = {
                    userId : userId,
                    bio : doc.data().bio,
                    email : doc.data().email,
                    handle : doc.data().handle,
                    imageUrl : doc.data().imageUrl
                }
            }
        })
        dispatch({
            type: 'GET_USER_DATA',
            payload : userCredentials
        })

    })
    .catch((err)=>{
        console.error(err);
    })
    
  }
  
export const registerUser = (userData, history) => dispatch => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/signup',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((res) => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then(data => {
            dispatch({
                type: 'USER_REGISTERED',
                payload: data
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

export const updateProfile = (data,id) => dispatch => {
    const db = firebase.firestore()
    db.collection("users").doc(id).update({ ...data })
    dispatch({
        type: "UPDATE_PROFILE"
    })
}

export const updateBio = (newBio) => dispatch => {
    const db = firebase.firestore()
    let userCredentials = {}
    db.collection("users")
    .doc(localStorage.getItem('userhandle'))
    .update({
        bio : newBio
    })
    .then(()=>{
        return db.collection("users")
        .doc(localStorage.getItem('userhandle'))
        .get()
    })
    .then((doc)=> {
        userCredentials = {
            userId : doc.data().userId,
            bio : newBio,
            email : doc.data().email,
            handle : doc.data().handle,
            imageUrl : doc.data().imageUrl
        }
        dispatch({
            type : 'GET_USER_DATA',
            payload : userCredentials
        })  
    })
    .catch((err)=>{
        console.error(err)
    })
}

export const uploadUserImage = (formData) => (dispatch) => {
    dispatch({ type: 'LOADING_UI' });
    axios
      .post(`https://us-central1-secondlove-cc51b.cloudfunctions.net/api/user/image`, formData,
      {
          headers : {
            //Authorization : localStorage.FBIdToken
            Authorization : `Bearer ${localStorage.token}`
            }
      })
      .then((res) => {
        dispatch({
            type : 'SET_MESSAGE',
            payload : ({message : 'Profile picture has been successfully changed.'})
        })
        dispatch({type : 'CLEAR_LOADING_UI'})
      })
      .catch((err) => console.log(err));
  };