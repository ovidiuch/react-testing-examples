// highlight{7,13}
import React from 'react';
import { mount } from 'enzyme';
import { HelloMessage } from 'shared/components/HelloMessage';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ name }) => mount(<HelloMessage name={name} />);

it('renders personalized greeting', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ name: 'Satoshi' });

  expect(wrapper.text()).toMatch(/Hello Satoshi/i);
});
