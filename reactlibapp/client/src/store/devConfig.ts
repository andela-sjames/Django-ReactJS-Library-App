import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import appReducer from '../reducers';

const logger = createLogger({
  // ...options
});

export default function configureStore() {
  return composeWithDevTools(
    applyMiddleware(thunk, reduxImmutableStateInvariant(), logger),
    autoRehydrate()
  )(createStore)(appReducer);
}
