// highlight{10-17,33-36}
import React from 'react';
import { mount } from '@bigtest/react';
import { FetchMock } from '@react-mock/fetch';
import { ServerCounter } from 'shared/components/ServerFetchCounter';
import { interactor, text, clickable } from '@bigtest/interactor';

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

@interactor
class FetchCounter {
  clickedText = text();
  increment = clickable('button');
}

let counter = new FetchCounter();

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
