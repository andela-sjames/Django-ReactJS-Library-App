import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as actions from '../../src/actions/authActions';
import { auth } from '../../src/actions/actionTypes';

declare var gapi: any;

const mockStore = configureMockStore([thunk]);

describe('Authentication action creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch SIGNIN_SUCCESS on successful signin', () => {
    const user = {
      email: 'test-user@andela.com',
    };

    moxios.stubRequest('/api/v1/auth/register/', {
      status: 200,
      response: {
        token: 'valid_token',
        user,
      },
    });

    const expectedActions = [
      { payload: user, type: auth.SIGNIN_SUCCESS },
    ];

    const store = mockStore();

    const gAuth = gapi.auth2.getAuthInstance();

    return store.dispatch(actions.signIn(gAuth.currentUser.get()))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch SIGNIN_FAILURE on failed signin', () => {
    const user = {
      email: 'test-user@andela.com',
    };

    moxios.stubRequest('/api/v1/auth/register/', {
      status: 401,
      response: {
        message: 'Invalid Token',
      },
    });

    const expectedActions = [
      {payload: {message: 'Invalid Token'},
       type: 'SIGNIN_FAILURE',
      },
    ];

    const store = mockStore();

    const gAuth = gapi.auth2.getAuthInstance();

    return store.dispatch(actions.signIn(gAuth.currentUser.get()))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch SIGNOUT_SUCCESS on successful signout', () => {
    const expectedActions = [
      { type: auth.SIGNOUT_SUCCESS },
    ];

    const store = mockStore();

    return store.dispatch(actions.signOut())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
