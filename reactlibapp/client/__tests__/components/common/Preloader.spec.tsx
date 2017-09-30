import * as React from 'react';
import { shallow } from 'enzyme';

import { Preloader } from '../../../src/components/common/Preloader';

describe('Preloader component', () => {
  let preloader;

  beforeEach(() => {
    preloader = shallow(<Preloader />);
  });

  it('renders without crashing', () => {
    expect(preloader.length).toBe(1);
  });

  it('has the right layout', () => {
    expect(preloader.find('svg.preloader').length).toBe(1);
  });

  it('is medium sized and white by default', () => {
    expect(preloader.find('svg.medium').length).toBe(1);
    expect(preloader.find('svg[stroke="#fff"]').length).toBe(1);
  });

  it('can take different sizes', () => {
    expect(preloader.find('svg.medium').length).toBe(1);
    expect(preloader.find('svg.big').length).toBe(0);

    preloader.setProps({
      size: 'big',
    });

    expect(preloader.find('svg.medium').length).toBe(0);
    expect(preloader.find('svg.big').length).toBe(1);
  });

  it('can take different colours', () => {
    expect(preloader.find('svg[stroke="#fff"]').length).toBe(1);
    expect(preloader.find('svg[stroke="#000"]').length).toBe(0);

    preloader.setProps({
      color: '#000',
    });

    expect(preloader.find('svg[stroke="#fff"]').length).toBe(0);
    expect(preloader.find('svg[stroke="#000"]').length).toBe(1);
  });
});
