// highlight{9-10,25-39}
import React from 'react';
import { mount } from 'enzyme';
import until from 'async-until';
import delay from 'delay';
import xhrMock from 'xhr-mock';
import { ServerCounter } from './component';

let count = 5;
let wrapper;

let notSyncing = () => {
  // Enzyme wrapper is not updated automatically since v3
  // https://github.com/airbnb/enzyme/issues/1163
  wrapper.update();
  return !wrapper.text().match('Syncing...');
};

let simulateIncrement = async () => {
  wrapper.find('button').simulate('click');
  await until(notSyncing);
};

beforeEach(() => {
  // Create fresh mocks for each test
  xhrMock.teardown();
  xhrMock.setup();
  xhrMock.get('/count', async (req, res) => {
    // Simulate 0.2s delay
    await delay(200);
    return res.status(200).body({ count });
  });
  xhrMock.post('/count', (req, res) =>
    res.status(200).body({ count: ++count })
  );

  // Flush instances between tests to prevent leaking state
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
