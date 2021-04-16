import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../Reducers/RootReducer'
import firebase from '../Firebase/fbConfig'
import { getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore';


const initialState = {};
const middleWare = [thunk.withExtraArgument({getFirebase, getFirestore})];

//WITHOUT REDUX DEV TOOLS
const store = createStore(RootReducer, initialState,
    compose(applyMiddleware(...middleWare), reduxFirestore(firebase)
    )
);

//WITH REDUX DEV TOOLS
// const store = createStore(RootReducer, initialState,
//     compose(applyMiddleware(...middleWare) ,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ,reduxFirestore(firebase)
//     )
// );

export default store;
