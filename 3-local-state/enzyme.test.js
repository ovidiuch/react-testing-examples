// highlight{6-8,12-13}
import React from 'react';
import { mount } from 'enzyme';
import { StatefulCounter } from './components';

// Hoist vars to make them accessible in all test blocks
let count = 5;
let wrapper;

beforeEach(() => {
  // Create fresh instances for each test to prevent leaking state
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
