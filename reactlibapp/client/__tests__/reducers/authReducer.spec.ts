import authReducer from '../../src/reducers/authReducer';
import { auth, persist } from '../../src/actions/actionTypes';

describe('Authentication reducer', () => {
  const signedInState = {
    email: 'test-user@andela.com',
    isAuthenticated: true,
  };

  it('should get initial state', () => {
    expect(authReducer()).toEqual({});
  });

  it('should handle SIGNIN_SUCCESS', () => {
    expect(authReducer({}, {
      type: auth.SIGNIN_SUCCESS,
      payload: {
        email: 'test-user@andela.com',
      },
    })).toEqual(signedInState);
  });

  it('should handle SIGNIN_FAILURE', () => {
    expect(authReducer({}, {
      type: auth.SIGNIN_FAILURE,
    })).toEqual({
      isAuthenticated: false,
    });
  });

  it('should handle SIGNOUT_SUCCESS', () => {
    expect(authReducer(signedInState, {
      type: auth.SIGNOUT_SUCCESS,
    })).toEqual({
      isAuthenticated: false,
    });
  });

  it('should handle rehydration', () => {
    expect(authReducer({}, {
      type: persist.RESTORE_STORE,
      payload: {
        auth: signedInState,
      },
    })).toEqual({
      isAuthenticated: false,
      email: 'test-user@andela.com',
    });
  });
});
