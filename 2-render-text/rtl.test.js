// highlight{7,13}
import React from 'react';
import { render } from 'react-testing-library';
import { HelloMessage } from './component';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ name }) => render(<HelloMessage name={name} />);

it('renders personalized greeting', () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ name: 'Satoshi' });

  expect(getByText('Hello Satoshi')).toBeTruthy();
});
