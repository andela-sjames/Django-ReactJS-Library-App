import * as React from 'react';
import { mount } from 'enzyme';
import { App } from '../../src/components/App';

describe('App component', () => {
  let app;
  const props = {
    compiler: 'TypeScript',
    framework: 'React',
    stateContainer: 'Redux'
  }

  beforeEach(() => {
    app = mount(<App {...props} />);
  });

  it('renders without crashing', () => {
    expect(app.length).toBe(1);
  });

  it('has the right layout', () => {
    expect(app.find('div.main').length).toBe(1);
    expect(app.find('h1').length).toBe(1);
    expect(app.find('h4').length).toBe(1);
  });

  it('displays the right text', () => {
    expect(app.find('h1').text()).toBe('This app is under construction');
    expect(app.find('h4').text()).toBe('Built with TypeScript, React and Redux');
  });

  it('displays text reactively', () => {
    app.setProps({
      compiler: 'Babel',
      stateContainer: 'Flux'
    });
    expect(app.find('h4').text()).toBe('Built with Babel, React and Flux');
  });
});
