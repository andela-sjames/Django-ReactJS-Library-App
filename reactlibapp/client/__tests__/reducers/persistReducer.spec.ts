import persistReducer from '../../src/reducers/persistReducer';
import { persist } from '../../src/actions/actionTypes';

describe('Persist reducer', () => {
  it('should get initial state', () => {
    expect(persistReducer()).toEqual({});
  });

  it('should handle persist.RESTORE_STORE', () => {
    const payload = {
      user: {},
      books: {},
    };

    expect(persistReducer({}, {
      type: persist.RESTORE_STORE,
      payload
    })).toEqual({
      user: {},
      books: {}
    });
  });
});
