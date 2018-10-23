// highlight{8,10}
import React from 'react';
import { mount } from 'enzyme';
import { HelloMessage } from 'shared/components/HelloMessage';

it('renders personalized greeting', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = mount(<HelloMessage name="Satoshi" />);

  expect(wrapper.text()).toMatch(/hello Satoshi/i);
});
