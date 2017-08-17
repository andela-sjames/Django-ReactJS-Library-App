import * as React from 'react';
import { mount } from 'enzyme';

import { Protected } from '../../../src/components/auth/Protected';

describe('Protected component', () => {
  let protectedWrapper;

  const props = {
    isAuthenticated: false,
    className: 'test',
  }

  const protectedWithFallback = (
    <Protected {...props}>
      <div className="child">You are logged in!</div>
      <div className="child">You are not logged in.</div>
    </Protected>
  );

  const protectedWithoutFallback = (
    <Protected {...props}>
      <div className="child">You are logged in!</div>
    </Protected>
  );

  beforeEach(() => {
    protectedWrapper = mount(protectedWithFallback);
  });

  it('renders without crashing', () => {
    expect(protectedWrapper.length).toBe(1);
  });

  it('has the right layout', () => {
    expect(protectedWrapper.find('div.test').length).toBe(1);
    expect(protectedWrapper.find('div.test > div.child').length).toBe(1);
  });

  it('renders child components in a wrapper with provided class name(s)', () => {
    expect(protectedWrapper.find('div.test').length).toBe(1);
    expect(protectedWrapper.find('div.wrapper').length).toBe(0);
    
    protectedWrapper.setProps({
      className: 'wrapper',
    });

    expect(protectedWrapper.find('div.test').length).toBe(0);
    expect(protectedWrapper.find('div.wrapper').length).toBe(1);
  });

  it('only renders one child', () => {
    expect(protectedWrapper.children().length).toBe(1);
  });

  it('renders the second (fallback) child if user is not authenticated', () => {
    expect(protectedWrapper.find('div > div.child').text()).toEqual('You are not logged in.');
  });

  it('renders the first (restricted) child if user is authenticated', () => {
    protectedWrapper.setProps({
      isAuthenticated: true,
    });
    expect(protectedWrapper.find('div > div.child').text()).toEqual('You are logged in!');
  });

  it('renders no children without crashing if no fallback child is provided and user is not authenticated',
    () => {
      protectedWrapper = mount(protectedWithoutFallback);
      expect(protectedWrapper.find('div.child').length).toBe(0);
    }
  );
});
