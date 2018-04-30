// highlight{8-9,22-36}
import React from 'react';
import { mount } from 'enzyme';
import until from 'async-until';
import fetchMock from 'fetch-mock';
import { ServerCounter } from './components';

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
  // Set fresh mocks for each test
  fetchMock.restore();
  fetchMock.mock({
    matcher: '/count',
    method: 'GET',
    response: { count }
  });
  fetchMock.mock({
    matcher: '/count',
    method: 'POST',
    response: () => ({ count: ++count })
  });

  // Create fresh instances for each test to prevent leaking state
  wrapper = mount(<ServerCounter />);
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
