// highlight{12-14}
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, waitForElement, fireEvent } from 'react-testing-library';
import { ReduxCounter } from 'shared/components/ReduxCounter';
import { counterReducer } from './reducer';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ count }) =>
  render(
    <Provider store={createStore(counterReducer, { count })}>
      <ReduxCounter />
    </Provider>
  );

it('renders initial count', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ count: 5 });

  await waitForElement(() => getByText('Clicked 5 times'));
});

it('increments count', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ count: 5 });

  fireEvent.click(getByText('+1'));
  await waitForElement(() => getByText('Clicked 6 times'));
});
