import axios from 'axios';
import { auth } from './actionTypes';
import { Dispatch } from '../types';

export const signIn = () => (
  (dispatch: Dispatch) => (
    dispatch({
      type: auth.SIGNIN_SUCCESS,
    })
  )
);

export const signOut = () => (
  (dispatch: Dispatch) => (
    dispatch({
      type: auth.SIGNOUT_SUCCESS,
    })
  )
);
