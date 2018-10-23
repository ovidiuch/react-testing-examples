// highlight{8,10}
import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { HelloMessage } from 'shared/components/HelloMessage';

it('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = render(<HelloMessage name="Satoshi" />);

  await waitForElement(() => getByText(/hello Satoshi/i));
});
