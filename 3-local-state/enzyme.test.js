// highlight{6-8,12-13}
import React from 'react';
import { mount } from 'enzyme';
import { StateMock } from '@react-mock/state';
import { StatefulCounter } from './component';

// Hoist vars to make them accessible in all test blocks
let count = 5;
let wrapper;

beforeEach(() => {
  // Flush instances between tests to prevent leaking state
  wrapper = mount(
    <StateMock state={{ count }}>
      <StatefulCounter />
    </StateMock>
  );
});

it('renders initial count', () => {
  expect(wrapper.text()).toContain(`Clicked ${count} times`);
});

it('renders incremented count', () => {
  wrapper.find('button').simulate('click');
  expect(wrapper.text()).toContain(`Clicked ${count + 1} times`);
});
