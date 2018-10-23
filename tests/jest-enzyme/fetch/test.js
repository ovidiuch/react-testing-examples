// highlight{12-19,23-25,34-37,45-49}
import React from 'react';
import { mount } from 'enzyme';
import until from 'async-until';
import retry from '@skidding/async-retry';
import { FetchMock } from '@react-mock/fetch';
import { ServerCounter } from 'shared/components/ServerFetchCounter';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ count }) =>
  mount(
    <FetchMock
      mocks={[
        { matcher: '/count', method: 'GET', response: { count } },
        { matcher: '/count', method: 'POST', response: { count: count + 1 } }
      ]}
    >
      <ServerCounter />
    </FetchMock>
  );

const isReady = wrapper => () => {
  // Enzyme wrapper is not updated automatically since v3
  // https://github.com/airbnb/enzyme/issues/1163
  wrapper.update();

  return !wrapper.text().match(/syncing.../i);
};

it('renders initial count', async () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ count: 5 });

  // It takes time for the counter to appear because
  // the GET request has a slight delay
  await retry(() => {
    expect(wrapper.text()).toMatch(/clicked 5 times/i);
  });
});

it('increments count', async () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ count: 5 });

  // It takes time for the button to appear because
  // the GET request has a slight delay
  await until(isReady(wrapper));

  wrapper.find('button').simulate('click');

  // The counter doesn't update immediately because
  // the POST request is asynchronous
  await retry(() => {
    expect(wrapper.text()).toMatch(/clicked 6 times/i);
  });
});
