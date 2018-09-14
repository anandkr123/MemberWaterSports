import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import tripReducer from './tripReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    trip: tripReducer
});