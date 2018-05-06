// highlight{6-8,11-12}
import React from 'react';
import { mount } from 'enzyme';
import { HelloMessage } from './components';

// Hoist vars to make them accessible in all test blocks
let name = 'Satoshi';
let wrapper;

beforeEach(() => {
  // Flush instances between tests to prevent leaking state
  wrapper = mount(<HelloMessage name={name} />);
});

it('renders personalized greeting', () => {
  expect(wrapper.text()).toContain(`Hello ${name}`);
});
