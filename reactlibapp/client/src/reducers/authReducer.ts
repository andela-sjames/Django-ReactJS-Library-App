import { auth } from '../actions/actionTypes';
import { Action } from '../types';

export default function authReducer(state:object = {}, action:Action = { type: '' }) {
  switch (action.type) {
    case auth.SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case auth.FAILURE:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
