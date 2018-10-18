// highlight{12-19,23-25,34-37,45-49}
import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { FetchMock } from '@react-mock/fetch';
import { ServerCounter } from './component';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ count }) =>
  render(
    <FetchMock
      mocks={[
        { matcher: '/count', method: 'GET', response: { count } },
        { matcher: '/count', method: 'POST', response: { count: count + 1 } }
      ]}
    >
      <ServerCounter />
    </FetchMock>
  );

it('renders initial count', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ count: 5 });

  // It takes time for the counter to appear because
  // the GET request has a slight delay
  await waitForElement(() => getByText('Clicked 5 times'));
});

it('increments count', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ count: 5 });

  // It takes time for the button to appear because
  // the GET request has a slight delay
  await waitForElement(() => getByText('+1'));
  fireEvent.click(getByText('+1'));

  // The counter doesn't update immediately because
  // the POST request is asynchronous
  await waitForElement(() => getByText('Clicked 6 times'));
});
