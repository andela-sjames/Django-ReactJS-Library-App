import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import appReducer from '../reducers';

export default function configureStore() {
  return compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )(createStore)(appReducer);
}
