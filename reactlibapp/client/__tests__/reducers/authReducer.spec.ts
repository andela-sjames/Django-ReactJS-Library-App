import authReducer from '../../src/reducers/authReducer';
import { auth } from '../../src/actions/actionTypes';

describe('Authentication reducer', () => {
  it('should get initial state', () => {
    expect(authReducer()).toEqual({});
  });

  it('should handle SIGNIN_SUCCESS', () => {
    expect(authReducer({}, {
      type: auth.SIGNIN_SUCCESS,
    })).toEqual({
      isAuthenticated: true,
    });
  });

  it('should handle SIGNIN_FAILURE', () => {
    expect(authReducer({}, {
      type: auth.SIGNIN_FAILURE,
    })).toEqual({
      isAuthenticated: false,
    });
  });

  it('should handle SIGNIN_SUCCESS', () => {
    expect(authReducer({}, {
      type: auth.SIGNOUT_SUCCESS,
    })).toEqual({
      isAuthenticated: false,
    });
  });
});
