// highlight{9-12,15-21}
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { ReduxCounter } from './component';
import { counterReducer } from './reducer';

// Hoist vars to make them accessible in all test blocks
let count = 5;
let store;
let wrapper;

beforeEach(() => {
  // Flush instances between tests to prevent leaking state
  store = createStore(counterReducer, { count });
  wrapper = mount(
    <Provider store={store}>
      <ReduxCounter />
    </Provider>
  );
});

it('renders initial count', () => {
  expect(wrapper.text()).toContain(`Clicked ${count} times`);
});

it('renders incremented count', () => {
  wrapper.find('button').simulate('click');
  expect(wrapper.text()).toContain(`Clicked ${count + 1} times`);
});
