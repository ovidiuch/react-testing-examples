// highlight{10-12}
import React from 'react';
import { mount } from 'enzyme';
import { StateMock } from '@react-mock/state';
import { StatefulCounter } from 'shared/components/StatefulCounter';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ count }) =>
  mount(
    <StateMock state={{ count }}>
      <StatefulCounter />
    </StateMock>
  );

it('renders initial count', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ count: 5 });

  expect(wrapper.text()).toMatch('Clicked 5 times');
});

it('increments count', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ count: 5 });

  wrapper.find('button').simulate('click');
  expect(wrapper.text()).toMatch('Clicked 6 times');
});
