import * as React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { SignInButton } from '../../../src/components/auth/SignInButton';

describe('SignInButton component', () => {
  let signInButton;
  const signInSpy = sinon.spy(() => {});

  const props = {
    signIn: signInSpy
  };

  beforeEach(() => {
    signInButton = mount(<SignInButton {...props} />);
  });

  it('renders without crashing', () => {
    expect(signInButton.length).toBe(1);
  });

  it('has the right layout', () => {
    expect(signInButton.find('a#signin-button').length).toBe(1);
    expect(signInButton.find('a > div.logo-container').length).toBe(1);
    expect(signInButton.find('a > div.separator').length).toBe(1);
    expect(signInButton.find('a > div.text-container').length).toBe(1);
  });

  it('renders the Google sign-in button correctly', () => {
    console.log(signInButton.html());
    expect(signInButton.find('.logo-container > svg.g-logo').length).toBe(1);
    expect(signInButton.find('svg > defs > path#a').length).toBe(1);
    expect(signInButton.find('svg > clipPath > [xlinkHref="#a"]').length).toBe(1);
    expect(signInButton.find('svg > path[clipPath="url(#b)"]').length).toBe(4);

    expect(signInButton.find('.text-container').text()).toEqual('Sign in with Google');
  });

  it('calls onSignInClick method and executes signIn action when sign-in button is clicked',
    () => {
      sinon.spy(signInButton.instance(), 'onSignInClick');
      signInButton.update();

      expect(signInButton.instance().onSignInClick.notCalled).toBe(true);
      expect(signInButton.props().signIn.notCalled).toBe(true);

      signInButton.find('#signin-button').simulate('click');

      expect(signInButton.instance().onSignInClick.calledOnce).toBe(true);
      expect(signInButton.props().signIn.calledOnce).toBe(true);
    });
});
