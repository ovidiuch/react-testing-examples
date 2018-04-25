import React from 'react';
import { mount } from 'enzyme';
import { CompWithBtn } from './components';

let wrapper;

beforeEach(() => {
  wrapper = mount(<CompWithBtn onClick={jest.fn()} />);
});

it('calls "onClick" prop on button click', () => {
  wrapper.find('button').simulate('click');
  expect(wrapper.prop('onClick')).toHaveBeenCalled();
});
