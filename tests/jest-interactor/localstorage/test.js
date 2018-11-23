// highlight{20-28,30,34,36,42,46-49,54,59-65}
import React from 'react';
import { mount } from '@bigtest/react';
import { interactor, text, clickable, fillable } from '@bigtest/interactor';
import { LocalStorageMock } from '@react-mock/localstorage';
import { PersistentForm } from 'shared/components/PersistentForm';

// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = ({ name }) =>
  mount(() => (
    <LocalStorageMock items={{ name }}>
      <PersistentForm />
    </LocalStorageMock>
  ));

// Create a custom reusable interactor for this form component.
// These custom interactors aren't usually in your test files
// and are reusable. So you write it once, import, and use it everywhere
// this component is used.
@interactor
class FormInteractor {
  // Get the text of the `p` element
  welcomeText = text('p');
  // Fill in the `#name-field` input with the passed value
  fillName = fillable('#name-field');
  // Click the submit `button`
  submit = clickable('button');
}

let form = new FormInteractor();

it('renders cached name', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ name: 'Trent' });

  await form.when(() => expect(form.welcomeText).toEqual('Welcome, Trent!'));
});

describe('on update', () => {
  it('renders updated name', async () => {
    // Render new instance in every test to prevent leaking state
    await renderComponent({ name: 'Trent' });

    // Fill the inputs name in with `Trevor`, submit the form,
    // and assert the change has taken place on the page
    await form
      .fillName('Trevor')
      .submit()
      .when(() => expect(form.welcomeText).toEqual('Welcome, Trevor!'));
  });

  it('updates LocalStorage cache', async () => {
    // Render new instance in every test to prevent leaking state
    await renderComponent({ name: 'Trent' });

    // Fill the inputs name in with `Bill`, submit the form,
    // and assert the change has taken place on the page
    // (and in local storage)
    await form
      .fillName('Bill')
      .submit()
      .when(() => {
        expect(form.welcomeText).toEqual('Welcome, Bill!');
        expect(localStorage.getItem('name')).toBe('Bill');
      });
  });
});
