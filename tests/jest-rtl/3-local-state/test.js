// highlight{10-12}
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { StateMock } from '@react-mock/state';
import { StatefulCounter } from 'shared/components/StatefulCounter';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ count }) =>
  render(
    <StateMock state={{ count }}>
      <StatefulCounter />
    </StateMock>
  );

it('renders initial count', () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ count: 5 });

  expect(getByText('Clicked 5 times')).toBeTruthy();
});

it('increments count', () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ count: 5 });

  fireEvent.click(getByText('+1'));
  expect(getByText('Clicked 6 times')).toBeTruthy();
});
