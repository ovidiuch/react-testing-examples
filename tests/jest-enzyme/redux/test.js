// highlight{12-14}
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { ReduxCounter } from 'shared/components/ReduxCounter';
import { counterReducer } from './reducer';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ count }) =>
  mount(
    <Provider store={createStore(counterReducer, { count })}>
      <ReduxCounter />
    </Provider>
  );

it('renders initial count', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ count: 5 });

  expect(wrapper.text()).toMatch(/clicked 5 times/i);
});

it('increments count', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ count: 5 });

  wrapper.find('button').simulate('click');
  expect(wrapper.text()).toMatch(/clicked 6 times/i);
});
