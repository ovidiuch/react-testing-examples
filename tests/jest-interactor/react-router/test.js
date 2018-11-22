// highlight{10-14,31-33}
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { mount } from '@bigtest/react';
import { interactor, clickable } from '@bigtest/interactor';
import { UserWithRouter } from 'shared/components/UserWithRouter';

// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = ({ userId }) =>
  mount(() => (
    <MemoryRouter initialEntries={[`/users/${userId}`]}>
      <Route path="/users/:userId">
        <UserWithRouter />
      </Route>
    </MemoryRouter>
  ));

@interactor
class UserPage {
  next = clickable('a');
}

let page = new UserPage();

it('renders initial user id', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ userId: 5 });

  await page.when(() => expect(page.text).toContain('User #5'));
});

it('renders next user id', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ userId: 5 });

  await page.next().when(() => expect(page.text).toContain('User #6'));
});
