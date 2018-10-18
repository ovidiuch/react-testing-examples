// highlight{10-14,31-33}
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { render, fireEvent } from 'react-testing-library';
import { UserWithRouter } from './component';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ userId }) =>
  render(
    <MemoryRouter initialEntries={[`/users/${userId}`]}>
      <Route path="/users/:userId">
        <UserWithRouter />
      </Route>
    </MemoryRouter>
  );

it('renders initial user id', () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ userId: 5 });

  expect(getByText('User #5')).toBeTruthy();
});

it('renders next user id', () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ userId: 5 });

  fireEvent.click(getByText('Next user'));
  expect(getByText('User #6')).toBeTruthy();
});
