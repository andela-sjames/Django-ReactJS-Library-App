import axios from 'axios';
import { auth } from './actionTypes';
import { Dispatch } from '../types';

declare var gapi: any;

export const signIn = (googleUser: any) => (
  (dispatch: Dispatch) => (
    axios.post('/api/v1/auth/register/', { ID_Token : googleUser.getAuthResponse().id_token })
      .then(({ data: { token, user }}) => {
        dispatch({
          type: auth.SIGNIN_SUCCESS,
          payload: user,
        });
      })
      .catch((err) => {
        dispatch({
          type: auth.SIGNIN_FAILURE,
        });
      })
  )
);

export const signOut = () => (
  (dispatch: Dispatch) => {
    const googleAuth = gapi.auth2.getAuthInstance();

    return googleAuth.signOut().then(() => {
      dispatch({
        type: auth.SIGNOUT_SUCCESS,
      });
    });
  }
);
