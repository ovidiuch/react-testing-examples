// highlight{7,10-17}
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { mount } from 'enzyme';
import { UserWithRouter } from './components';

let wrapper;

beforeEach(() => {
  // Create fresh instances for each test to prevent leaking state
  wrapper = mount(
    <MemoryRouter initialEntries={['/users/5']}>
      <Route path="/users/:userId">
        <UserWithRouter />
      </Route>
    </MemoryRouter>
  );
});

it('renders initial user id', () => {
  expect(wrapper.text()).toContain(`User #5`);
});

it('renders next user id', () => {
  wrapper
    .find('a')
    .find({ children: 'Next user' })
    // RR Link ignores clicks if event.button isn't 0 (eg. right click events)
    // https://github.com/airbnb/enzyme/issues/516
    .simulate('click', { button: 0 });

  expect(wrapper.text()).toContain(`User #6`);
});
