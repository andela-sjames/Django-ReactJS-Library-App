import axios from 'axios';
import { auth } from './actionTypes';
import { Dispatch } from '../types';

export const signUp = () => (
  (dispatch:Dispatch) => (
    dispatch({
      type: auth.SUCCESS
    })
  )
)

export const signIn = () => (
  (dispatch:Dispatch) => (
    dispatch({
      type: auth.SUCCESS
    })
  )
)

export const signOut = () => (
  (dispatch:Dispatch) => (
    dispatch({
      type: auth.FAILURE
    })
  )
)
