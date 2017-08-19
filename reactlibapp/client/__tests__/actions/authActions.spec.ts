import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../src/actions/authActions';
import { auth } from '../../src/actions/actionTypes';

const mockStore = configureMockStore([thunk]);

describe('Authentication action creators', () => {
  it('should dispatch SIGNIN_SUCCESS on successful signin', () => {
    const expectedActions = [
      { type: auth.SIGNIN_SUCCESS },
    ];

    const store = mockStore();

    store.dispatch(actions.signIn());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch SIGNOUT_SUCCESS on successful signout', () => {
    const expectedActions = [
      { type: auth.SIGNOUT_SUCCESS },
    ];

    const store = mockStore();

    store.dispatch(actions.signOut());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
