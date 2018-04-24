import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { ReduxCounter, counterReducer } from '../shared/components';

let count = 5;
let store = createStore(counterReducer, { count });
let wrapper;

beforeEach(() => {
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
