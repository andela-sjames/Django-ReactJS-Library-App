import { auth } from '../actions/actionTypes';
import { Action } from '../types';

export default function authReducer(state: object = {}, action: Action = { type: '' }) {
  switch (action.type) {
    case auth.SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case auth.SIGNIN_FAILURE:
    case auth.SIGNOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
