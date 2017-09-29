import * as React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Protected } from '../../../src/components/auth/Protected';

describe('Protected component', () => {
  let protectedWrapper;
  const signInSpy = sinon.spy(() => {});

  const props = {
    isAuthenticated: false,
    className: 'test',
    signIn: signInSpy,
  };

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

  const protectedShouldWait = (
    <Protected {...props} wait={true} email="email">
      <div className="child">You are logged in!</div>
      <div className="child">You are not logged in.</div>
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
    },
  );

  describe('with wait specified', () => {
    let protectedWaitWrapper;

    beforeAll(() => {
      protectedWaitWrapper = mount(protectedShouldWait);
    });

    it('renders without crashing', () => {
      expect(protectedWaitWrapper.length).toBe(1);
    });

    it('attempts silent sign-in and renders a preloader if possible', () => {
      expect(protectedWaitWrapper.props().signIn.calledOnce).toBe(true);

      expect(protectedWaitWrapper.find('div.centered-container').length).toBe(1);
      expect(protectedWaitWrapper.find('svg.preloader').length).toBe(1);
      expect(protectedWaitWrapper.find('div.test').length).toBe(0);
      expect(protectedWaitWrapper.find('div.test > div.child').length).toBe(0);
    });

    it('switches to restricted component on authentication success', () => {
      protectedWaitWrapper.setProps({
        isAuthenticated: true,
      });

      expect(protectedWaitWrapper.find('div.centered-container').length).toBe(0);
      expect(protectedWaitWrapper.find('svg.preloader').length).toBe(0);
      expect(protectedWaitWrapper.find('div.test').length).toBe(1);
      expect(protectedWaitWrapper.find('div.test > div.child').length).toBe(1);
      expect(protectedWaitWrapper.find('div > div.child').text()).toEqual('You are logged in!');
    });

    it('switches to fallback component on authentication failure', () => {
      protectedWaitWrapper.setProps({
        isAuthenticated: false,
        email: '',
      });

      expect(protectedWaitWrapper.find('div.centered-container').length).toBe(0);
      expect(protectedWaitWrapper.find('svg.preloader').length).toBe(0);
      expect(protectedWaitWrapper.find('div.test').length).toBe(1);
      expect(protectedWaitWrapper.find('div.test > div.child').length).toBe(1);
      expect(protectedWaitWrapper.find('div > div.child').text()).toEqual('You are not logged in.');
    });
  });
});
