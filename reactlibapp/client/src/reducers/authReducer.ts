import { auth, persist } from '../actions/actionTypes';

import { IAction } from '../types';

export default function authReducer(state: object = {}, action: IAction = { type: '' }) {
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
        ...action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
