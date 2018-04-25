import React from 'react';
import { mount } from 'enzyme';
import { StatefulCounter } from './components';

let count = 5;
let wrapper;

beforeEach(() => {
  wrapper = mount(<StatefulCounter />);
  wrapper.setState({ count });
});

it('renders initial count', () => {
  expect(wrapper.text()).toContain(`Clicked ${count} times`);
});

it('renders incremented count', () => {
  wrapper.find('button').simulate('click');
  expect(wrapper.text()).toContain(`Clicked ${count + 1} times`);
});
