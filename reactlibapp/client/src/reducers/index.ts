import { combineReducers } from 'redux';
import persistReducer from './persistReducer';

const appReducer = combineReducers({
  persistReducer
});

export default appReducer;
