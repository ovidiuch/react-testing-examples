// highlight{12-14}
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, waitForElement, fireEvent } from 'react-testing-library';
import { ReduxCounter } from 'shared/components/ReduxCounter';
import { counterReducer } from './reducer';

// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = ({ count }) =>
  render(
    <Provider store={createStore(counterReducer, { count })}>
      <ReduxCounter />
    </Provider>
  );

it('renders initial count', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = renderComponent({ count: 5 });

  await waitForElement(() => getByText(/clicked 5 times/i));
});

it('increments count', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = renderComponent({ count: 5 });

  fireEvent.click(getByText('+1'));
  await waitForElement(() => getByText(/clicked 6 times/i));
});
