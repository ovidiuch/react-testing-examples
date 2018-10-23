// highlight{10-12}
import React from 'react';
import { render, waitForElement, fireEvent } from 'react-testing-library';
import { StateMock } from '@react-mock/state';
import { StatefulCounter } from 'shared/components/StatefulCounter';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ count }) =>
  render(
    <StateMock state={{ count }}>
      <StatefulCounter />
    </StateMock>
  );

it('renders initial count', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ count: 5 });

  await waitForElement(() => getByText(/clicked 5 times/i));
});

it('increments count', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ count: 5 });

  fireEvent.click(getByText('+1'));
  await waitForElement(() => getByText(/clicked 6 times/i));
});
