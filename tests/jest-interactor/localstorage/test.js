// highlight{10-12}
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

@interactor
class FormInteractor {
  welcomeText = text('p');
  fillName = fillable('#name-field');
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
    await form
      .fillName('Trevor')
      .submit()
      .when(() => expect(form.welcomeText).toEqual('Welcome, Trevor!'));
  });

  it('updates LocalStorage cache', async () => {
    // Render new instance in every test to prevent leaking state
    await renderComponent({ name: 'Trent' });

    await form
      .fillName('Bill')
      .submit()
      .when(() => {
        expect(form.welcomeText).toEqual('Welcome, Bill!');
        expect(localStorage.getItem('name')).toBe('Bill');
      });
  });
});
