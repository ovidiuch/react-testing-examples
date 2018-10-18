// highlight{7,13-14}
import React from 'react';
import { mount } from 'enzyme';
import { CustomButton } from './component';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = () => mount(<CustomButton onClick={jest.fn()} />);

it('calls "onClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper();

  wrapper.find('button').simulate('click');
  expect(wrapper.prop('onClick')).toHaveBeenCalled();
});
