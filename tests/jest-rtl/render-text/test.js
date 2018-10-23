// highlight{7,13}
import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { HelloMessage } from 'shared/components/HelloMessage';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ name }) => render(<HelloMessage name={name} />);

it('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ name: 'Satoshi' });

  await waitForElement(() => getByText(/hello Satoshi/i));
});
