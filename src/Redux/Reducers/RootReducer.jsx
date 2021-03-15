import { combineReducers } from 'redux';
import ItemsReducers from './ItemsReducers';
import TwitterReducers from './TwitterReducers'


const RootReducer = combineReducers({
    twitter: TwitterReducers,
    items: ItemsReducers
});

export default RootReducer;
