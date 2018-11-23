// highlight{19-23,25,29,31,36,39}
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

// Create custom interactor for interacting with this page
@interactor
class UserPage {
  // click the next user link
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

  // click the next link and assert the page route changed
  await page.next().when(() => expect(page.text).toContain('User #6'));
});
