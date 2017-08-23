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
        console.error(err);
      })
  )
);

export const silentSignIn = () => {
  const googleAuth = gapi.auth2.getAuthInstance();

  if (googleAuth.isSignedIn.get()) {
    googleAuth.signIn();
  }
};

export const signOut = () => (
  (dispatch: Dispatch) => {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(() => {
      dispatch({
        type: auth.SIGNOUT_SUCCESS,
      });
    });
  }
);
