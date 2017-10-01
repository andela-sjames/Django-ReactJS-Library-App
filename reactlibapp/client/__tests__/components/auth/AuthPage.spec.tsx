import * as React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { newMockStore } from '../../__mocks__/store';
import { AuthPage } from '../../../src/components/auth/AuthPage';

describe('AuthPage component', () => {
  let authPage;
  const div = document.createElement('div');

  beforeEach(() => {
    document.body.appendChild(div);
    authPage = mount(
      <Provider store={newMockStore()}><AuthPage /></Provider>,
      { attachTo: div },
    );
  });

  afterEach(() => {
    authPage.detach();
    document.body.removeChild(div);
  });

  it('renders without crashing', () => {
    expect(authPage.length).toBe(1);
  });

  it('has the right layout', () => {
    expect(authPage.find('div.centered-container').length).toBe(1);
  });

  it('should render subcomponent', () => {
    expect(authPage.find('a#signin-button').length).toBe(1);
  });
});
