import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

export const newMockStore = () => (
  mockStore({
    auth: {},
    persist: {},
  })
);
