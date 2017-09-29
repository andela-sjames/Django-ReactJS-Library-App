import * as React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { Dashboard } from '../../../src/components/main/Dashboard';

describe('Dashboard component', () => {
  let dashboard;
  const signOutSpy = sinon.spy(() => {});

  const props = {
    compiler: 'TypeScript',
    framework: 'React',
    stateContainer: 'Redux',
    signOut: signOutSpy,
  };

  beforeEach(() => {
    dashboard = mount(<Dashboard {...props} />);
  });

  it('renders without crashing', () => {
    expect(dashboard.length).toBe(1);
  });

  it('has the right layout', () => {
    expect(dashboard.find('div.centered-container').length).toBe(1);
    expect(dashboard.find('div.centered-container > h1').length).toBe(1);
    expect(dashboard.find('div.centered-container > h4').length).toBe(1);
    expect(dashboard.find('div.centered-container > br').length).toBe(1);
    expect(dashboard.find('div.centered-container > a').length).toBe(1);
  });

  it('displays the right text', () => {
    expect(dashboard.find('h1').text()).toBe('This app is under construction');
    expect(dashboard.find('h4').text()).toBe('Built with TypeScript, React and Redux');
  });

  it('displays text reactively', () => {
    dashboard.setProps({
      compiler: 'Babel',
      stateContainer: 'Flux',
    });
    expect(dashboard.find('h4').text()).toBe('Built with Babel, React and Flux');
  });

  it('displays a signout button', () => {
    expect(dashboard.find('a.mui-btn').length).toBe(1);
    expect(dashboard.find('a.mui-btn').text()).toBe('Sign Out');
  });

  it('calls onSignOutClick method and executes signOut action when signout button is clicked',
    () => {
      sinon.spy(dashboard.instance(), 'onSignOutClick');
      dashboard.update();

      expect(dashboard.instance().onSignOutClick.notCalled).toBe(true);
      expect(dashboard.props().signOut.notCalled).toBe(true);

      dashboard.find('#signout-button').simulate('click');

      expect(dashboard.instance().onSignOutClick.calledOnce).toBe(true);
      expect(dashboard.props().signOut.calledOnce).toBe(true);
    });
});
