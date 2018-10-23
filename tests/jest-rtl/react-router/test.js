// highlight{10-14,31-33}
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { render, waitForElement, fireEvent } from 'react-testing-library';
import { UserWithRouter } from 'shared/components/UserWithRouter';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ userId }) =>
  render(
    <MemoryRouter initialEntries={[`/users/${userId}`]}>
      <Route path="/users/:userId">
        <UserWithRouter />
      </Route>
    </MemoryRouter>
  );

it('renders initial user id', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ userId: 5 });

  await waitForElement(() => getByText(/user #5/i));
});

it('renders next user id', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ userId: 5 });

  fireEvent.click(getByText('Next user'));
  await waitForElement(() => getByText(/user #6/i));
});
