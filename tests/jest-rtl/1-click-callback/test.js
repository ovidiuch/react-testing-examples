// highlight{7,13-14}
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Button } from 'shared/components/Button';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ onClick }) => render(<Button onClick={onClick} />);

it('calls "onClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const onClick = jest.fn();
  const { getByText } = getWrapper({ onClick });

  fireEvent.click(getByText('Click me nao'));
  expect(onClick).toHaveBeenCalled();
});
