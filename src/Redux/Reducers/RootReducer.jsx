import { combineReducers } from 'redux';
<<<<<<< Updated upstream
import ItemsReducers from './ItemsReducers';
=======
import itemReducers from './itemReducer';
>>>>>>> Stashed changes
import TwitterReducers from './TwitterReducers'
import userReducer from './userReducer'
import itemReducer from './itemReducer'


const RootReducer = combineReducers({
    twitter: TwitterReducers,
<<<<<<< Updated upstream
    items: ItemsReducers
=======
    user : userReducer,
    item : itemReducer
>>>>>>> Stashed changes
});

export default RootReducer;
