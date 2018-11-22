// highlight{15-22,38-41}
import React from 'react';
import { mount } from '@bigtest/react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { interactor, text, clickable } from '@bigtest/interactor';
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

@interactor
class XhrCounter {
  clickedText = text();
  increment = clickable('button');
}

let counter = new XhrCounter();

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
  await counter
    .increment()
    .when(() => expect(counter.clickedText).toContain('Clicked 6 times'));
});
