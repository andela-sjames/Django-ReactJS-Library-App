import { combineReducers } from 'redux';
import auth from './authReducer';

const appReducer = combineReducers({
  auth,
});

export default appReducer;
