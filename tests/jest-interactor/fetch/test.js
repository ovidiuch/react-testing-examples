// highlight{21,25,29-31,36,40-42}
import React from 'react';
import { mount } from '@bigtest/react';
import Counter from '../counter-interactor';
import { FetchMock } from '@react-mock/fetch';
import { ServerCounter } from 'shared/components/ServerFetchCounter';

// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = ({ count }) =>
  mount(() => (
    <FetchMock
      mocks={[
        { matcher: '/count', method: 'GET', response: { count } },
        { matcher: '/count', method: 'POST', response: { count: count + 1 } }
      ]}
    >
      <ServerCounter />
    </FetchMock>
  ));

let counter = new Counter();

it('renders initial count', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ count: 5 });

  // It takes time for the counter to appear because
  // the GET request has a slight delay
  await counter.when(() =>
    expect(counter.clickedText).toContain('Clicked 5 times')
  );
});

it('increments count', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ count: 5 });

  // It takes time for the button to appear because
  // the GET request has a slight delay
  await counter
    .increment()
    .when(() => expect(counter.clickedText).toContain('Clicked 6 times'));
});
