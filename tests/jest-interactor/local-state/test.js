// highlight{17,21,23-25,30,34-36}
import React from 'react';
import { mount } from '@bigtest/react';
import Counter from '../counter-interactor';
import { StateMock } from '@react-mock/state';
import { StatefulCounter } from 'shared/components/StatefulCounter';

// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = ({ count }) =>
  mount(() => (
    <StateMock state={{ count }}>
      <StatefulCounter />
    </StateMock>
  ));

// reuse the custom interactor for the same type of component
let counter = new Counter();

it('renders initial count', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ count: 5 });

  await counter.when(() =>
    expect(counter.clickedText).toContain('Clicked 5 times')
  );
});

it('increments count', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ count: 5 });

  // Interactions from interactor are chainable,
  // we can increment and then assert in the same chain.
  await counter
    .increment()
    .when(() => expect(counter.clickedText).toContain('Clicked 6 times'));
});
