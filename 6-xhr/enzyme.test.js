// highlight{9-10,25-39}
import React from 'react';
import { mount } from 'enzyme';
import until from 'async-until';
import delay from 'delay';
import { XhrMock } from '@react-mock/xhr';
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

const delayed = val =>
  new Promise(async resolve => {
    await delay(200);
    resolve(val);
  });

beforeEach(() => {
  // Simulate GET delay
  const getRes = async (req, res) => delayed(res.status(200).body({ count }));
  const postRes = (req, res) => res.status(200).body({ count: ++count });

  // Flush instances between tests to prevent leaking state
  wrapper = mount(
    <XhrMock
      mocks={[
        { url: '/count', method: 'GET', response: getRes },
        { url: '/count', method: 'POST', response: postRes }
      ]}
    >
      <ServerCounter />
    </XhrMock>
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
