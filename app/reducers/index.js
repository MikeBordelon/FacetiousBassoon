import { combineReducers } from 'redux';

// Reducers
import userReducer from './user-reducer';


// Combine Reducers
var reducers = combineReducers({
  userState: userReducer,
});

export default reducers;
