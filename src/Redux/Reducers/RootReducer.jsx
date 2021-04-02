import { combineReducers } from 'redux';
import itemReducer from './itemReducer'
import { firestoreReducer } from 'redux-firestore'
import userReducer from './userReducer'
import uiReducer from './uiReducer'

const RootReducer = combineReducers({
    item : itemReducer,
    firestore: firestoreReducer,
    user: userReducer,
    ui : uiReducer
});

export default RootReducer;
