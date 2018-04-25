import React from 'react';
import { mount } from 'enzyme';
import until from 'async-until';
import xhrMock from 'xhr-mock';
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
  xhrMock.setup();
  xhrMock.get('/count', (req, res) => res.status(200).body(count));
  xhrMock.post('/count', (req, res) => res.status(200).body(++count));

  wrapper = mount(<ServerCounter />);
});

afterEach(() => {
  xhrMock.teardown();
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
