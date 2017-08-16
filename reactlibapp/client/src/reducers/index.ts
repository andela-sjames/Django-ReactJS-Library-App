import { combineReducers } from 'redux';
import authReducer from './authReducer';
import persistReducer from './persistReducer';

const appReducer = combineReducers({
  auth: authReducer,
  persist: persistReducer
});

export default appReducer;
