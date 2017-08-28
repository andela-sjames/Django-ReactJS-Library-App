import { combineReducers } from 'redux';
import auth from './authReducer';
import persist from './persistReducer';

const appReducer = combineReducers({
  auth,
  persist,
});

export default appReducer;
