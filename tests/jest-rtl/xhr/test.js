// highlight{15-22,38-41}
import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { XhrMock } from '@react-mock/xhr';
import { ServerCounter } from 'shared/components/ServerXhrCounter';

// Hoist helper functions (but not vars) to reuse between test cases
const getRes = count => async (req, res) => res.status(200).body({ count });

const postRes = count => (req, res) =>
  res.status(200).body({ count: count + 1 });

const renderComponent = ({ count }) =>
  render(
    <XhrMock
      mocks={[
        { url: '/count', method: 'GET', response: getRes(count) },
        { url: '/count', method: 'POST', response: postRes(count) }
      ]}
    >
      <ServerCounter />
    </XhrMock>
  );

it('renders initial count', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = renderComponent({ count: 5 });

  // It takes time for the counter to appear because
  // the GET request has a slight delay
  await waitForElement(() => getByText(/clicked 5 times/i));
});

it('increments count', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = renderComponent({ count: 5 });

  // It takes time for the button to appear because
  // the GET request has a slight delay
  await waitForElement(() => getByText('+1'));
  fireEvent.click(getByText('+1'));

  // The counter doesn't update immediately because
  // the POST request is asynchronous
  await waitForElement(() => getByText(/clicked 6 times/i));
});
