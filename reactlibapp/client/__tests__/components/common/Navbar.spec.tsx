import * as React from 'react';
import { shallow } from 'enzyme';

import { Navbar } from '../../../src/components/common/Navbar';

describe('Navbar component', () => {
  let navbar;

  beforeEach(() => {
    navbar = shallow(<Navbar />);
  });

  it('renders without crashing', () => {
    expect(navbar.length).toBe(1);
  });

  it('has the right layout', () => {
    expect(navbar.find('nav').length).toBe(1);
    expect(navbar.find('nav > h1').length).toBe(1);
  });

  it('displays app name', () => {
    expect(navbar.find('nav > h1').text()).toEqual('Library App');
  });

  it('uppercases, adds shadow to and uses cursive font for app name', () => {
    expect(navbar.find('nav > h1.upper.shadowed.cursive').length).toBe(1);
  });
});