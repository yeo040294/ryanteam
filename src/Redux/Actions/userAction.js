
export const loginUser = (userData, history) => dispatch => {
    
     fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/login',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((res) => res.json())
        .then((data) => {
            //data is login token
            
            const FBIdToken = `Bearer ${data.token}`
            localStorage.setItem('FBIdToken', `Bearer ${data.token}`)
            dispatch(getUserData());
            history.push('/')
        })
        .catch((err) => console.log(err));
}

export const getUserData = () => (dispatch) => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/user',{
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.FBIdToken
        },
    })
    .then((res) => res.json())
    .then((data) => {
        dispatch({
          type: 'SET_USER',
          payload: data
        });
      })
      .catch((err) => console.log(err));
  } 