// highlight{9,11}
import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'shared/components/Button';

it('calls "onClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const onClick = jest.fn();
  const wrapper = mount(<Button onClick={onClick} />);

  wrapper.find('button').simulate('click');
  expect(onClick).toHaveBeenCalled();
});
