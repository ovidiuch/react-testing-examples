// highlight{12-14}
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from '@bigtest/react';
import { interactor, clickable } from '@bigtest/interactor';
import { ReduxCounter } from 'shared/components/ReduxCounter';
import { counterReducer } from './reducer';

// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = ({ count }) =>
  mount(() => (
    <Provider store={createStore(counterReducer, { count })}>
      <ReduxCounter />
    </Provider>
  ));

@interactor
class Counter {
  increment = clickable('button');
}

let counter = new Counter();

it('renders initial count', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ count: 5 });

  await counter.when(() => expect(counter.text).toContain('Clicked 5 times'));
});

it('increments count', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ count: 5 });

  await counter
    .increment()
    .when(() => expect(counter.text).toContain('Clicked 6 times'));
});
