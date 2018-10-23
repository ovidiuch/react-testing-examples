// highlight{7,14-15}
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Button } from 'shared/components/Button';

// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = ({ onClick }) => render(<Button onClick={onClick} />);

it('calls "onClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const onClick = jest.fn();
  const { getByText } = renderComponent({ onClick });

  fireEvent.click(getByText('Click me nao'));
  expect(onClick).toHaveBeenCalled();
});
