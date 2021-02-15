import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../Reducers/RootReducer'

const initialState = {};
const middleWare = [thunk];
const store = createStore(RootReducer, initialState, applyMiddleware(...middleWare));

export default store;
