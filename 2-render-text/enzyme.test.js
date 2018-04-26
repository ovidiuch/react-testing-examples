// highlight{6-7,10-11}
import React from 'react';
import { mount } from 'enzyme';
import { HelloMessage } from './components';

// Hoist vars to make them accessible in all test blocks
let wrapper;

beforeEach(() => {
  // Create fresh instances for each test to prevent leaking state
  wrapper = mount(<HelloMessage name="Satoshi" />);
});

it('renders "Hello {name}"', () => {
  expect(wrapper.text()).toContain('Hello Satoshi');
});
