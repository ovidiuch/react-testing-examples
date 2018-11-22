// highlight{10-12}
import React from 'react';
import { mount } from '@bigtest/react';
import { StateMock } from '@react-mock/state';
import { interactor, text, clickable } from '@bigtest/interactor';
import { StatefulCounter } from 'shared/components/StatefulCounter';

// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = ({ count }) =>
  mount(() => (
    <StateMock state={{ count }}>
      <StatefulCounter />
    </StateMock>
  ));

@interactor
class StateCounter {
  clickedText = text();
  increment = clickable('button');
}

let counter = new StateCounter();

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

  await counter
    .increment()
    .when(() => expect(counter.clickedText).toContain('Clicked 6 times'));
});
