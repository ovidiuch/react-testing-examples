// highlight{9,11}
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Button } from 'shared/components/Button';

it('calls "onClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const onClick = jest.fn();
  const { getByText } = render(<Button onClick={onClick} />);

  fireEvent.click(getByText('Click me nao'));
  expect(onClick).toHaveBeenCalled();
});
