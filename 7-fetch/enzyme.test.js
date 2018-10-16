// highlight{8-9,22-36}
import React from 'react';
import { mount } from 'enzyme';
import until from 'async-until';
import { FetchMock } from '@react-mock/fetch';
import { ServerCounter } from './component';

let count = 5;
let wrapper;

let notSyncing = () => {
  wrapper.update();
  return !wrapper.text().match('Syncing...');
};

let simulateIncrement = async () => {
  wrapper.find('button').simulate('click');
  await until(notSyncing);
};

beforeEach(() => {
  const increment = () => ({ count: ++count });

  // Flush instances between tests to prevent leaking state
  wrapper = mount(
    <FetchMock
      mocks={[
        { matcher: '/count', method: 'GET', response: { count } },
        { matcher: '/count', method: 'POST', response: increment }
      ]}
    >
      <ServerCounter />
    </FetchMock>
  );
});

it('renders initial count', async () => {
  await until(notSyncing);
  expect(wrapper.text()).toContain(`Clicked 5 times`);
});

it('renders incremented count', async () => {
  await until(notSyncing);
  await simulateIncrement();
  await simulateIncrement();
  expect(wrapper.text()).toContain(`Clicked 7 times`);
});
