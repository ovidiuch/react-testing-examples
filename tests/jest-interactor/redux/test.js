// highlight{19,23,25-27,32,36-38}
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from '@bigtest/react';
import Counter from '../counter-interactor';
import { ReduxCounter } from 'shared/components/ReduxCounter';
import { counterReducer } from './reducer';

// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = ({ count }) =>
  mount(() => (
    <Provider store={createStore(counterReducer, { count })}>
      <ReduxCounter />
    </Provider>
  ));

// reuse the custom interactor for the same type of component
let counter = new Counter();

it('renders initial count', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ count: 5 });

  await counter.when(() =>
    expect(counter.clickedText).toContain('Clicked 5 times')
  );
});

it('increments count', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ count: 5 });

  // Interactions from interactor are chainable,
  // we can increment and then assert in the same chain.
  await counter
    .increment()
    .when(() => expect(counter.text).toContain('Clicked 6 times'));
});
