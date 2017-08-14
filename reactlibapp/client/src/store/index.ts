import * as localForage from 'localforage';
import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import appReducer from '../reducers';

let middleware = [thunk];
let composer:any;

if (process.env.NODE_ENV === 'production') {
  composer = require('redux').compose;
} else {
  const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
  const logger = require('redux-logger').createLogger({
    // ...options
  });
  composer = require('redux-devtools-extension').composeWithDevTools;
  middleware = middleware.concat(reduxImmutableStateInvariant, logger);
}

const store = composer(
  applyMiddleware(...middleware),
  autoRehydrate()
)(createStore)(appReducer);

persistStore(store, {storage: localForage});

export default store;
