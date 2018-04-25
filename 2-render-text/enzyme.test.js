import React from 'react';
import { mount } from 'enzyme';
import { HelloMessage } from './components';

let wrapper;

beforeEach(() => {
  wrapper = mount(<HelloMessage name="Satoshi" />);
});

it('renders "Hello {name}"', () => {
  expect(wrapper.text()).toContain('Hello Satoshi');
});
