import { persist } from '../actions/actionTypes';
import { PersistAction } from '../actions/actionTypes.d';

// Loads state persisted with redux-persist.
// TODO: Distribute to individual reducers (to preserve app structure)
export default function persistReducer(state:object = {}, action:PersistAction = {}) {
  switch (action.type) {
    case persist.RESTORE_STORE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
