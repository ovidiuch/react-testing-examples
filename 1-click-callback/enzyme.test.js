// highlight{6-7,10-11}
import React from 'react';
import { mount } from 'enzyme';
import { CompWithBtn } from './components';

// Hoist vars to make them accessible in all test blocks
let wrapper;

beforeEach(() => {
  // Flush instances between tests to prevent leaking state
  wrapper = mount(<CompWithBtn onClick={jest.fn()} />);
});

it('calls "onClick" prop on button click', () => {
  wrapper.find('button').simulate('click');
  expect(wrapper.prop('onClick')).toHaveBeenCalled();
});
