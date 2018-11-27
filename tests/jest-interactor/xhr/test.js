// highlight{27,31,35-37,42,50-52}
import React from 'react';
import { mount } from '@bigtest/react';
import Counter from '../counter-interactor';
import { XhrMock } from '@react-mock/xhr';
import { ServerCounter } from 'shared/components/ServerXhrCounter';

// Hoist helper functions (but not vars) to reuse between test cases
const getRes = count => async (req, res) => res.status(200).body({ count });

const postRes = count => (req, res) =>
  res.status(200).body({ count: count + 1 });

const renderComponent = ({ count }) =>
  mount(() => (
    <XhrMock
      mocks={[
        { url: '/count', method: 'GET', response: getRes(count) },
        { url: '/count', method: 'POST', response: postRes(count) }
      ]}
    >
      <ServerCounter />
    </XhrMock>
  ));

// reuse the custom interactor for the same type of component
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
  // The counter doesn't update immediately because
  // the POST request is asynchronous
  // Interactions from interactor are chainable,
  // we can increment and then assert in the same chain.
  await counter
    .increment()
    .when(() => expect(counter.clickedText).toContain('Clicked 6 times'));
});
