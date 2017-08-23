import { auth, persist } from '../actions/actionTypes';

import { Action } from '../types';

export default function authReducer(state: object = {}, action: Action = { type: '' }) {
  switch (action.type) {
    case persist.RESTORE_STORE:
      return {
        ...state,
        ...action.payload.auth,
        isAuthenticated: false,
      };
    case auth.SIGNIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case auth.SIGNIN_FAILURE:
    case auth.SIGNOUT_SUCCESS:
      return {
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
