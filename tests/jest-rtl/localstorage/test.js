// highlight{10-12}
import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { LocalStorageMock } from '@react-mock/localstorage';
import { PersistentForm } from 'shared/components/PersistentForm';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ name }) =>
  render(
    <LocalStorageMock items={{ name }}>
      <PersistentForm />
    </LocalStorageMock>
  );

const submitForm = ({ getByLabelText, getByText }, { name }) => {
  fireEvent.change(getByLabelText('Name'), { target: { value: name } });
  fireEvent.click(getByText('Change name'));
};

it('renders cached name', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ name: 'Trent' });

  await waitForElement(() => getByText('Welcome, Trent!'));
});

describe('on update', () => {
  it('renders updated name', async () => {
    // Render new instance in every test to prevent leaking state
    const wrapper = getWrapper({ name: 'Trent' });
    submitForm(wrapper, { name: 'Trevor' });

    await waitForElement(() => wrapper.getByText('Welcome, Trevor!'));
  });

  it('updates LocalStorage cache', () => {
    // Render new instance in every test to prevent leaking state
    const wrapper = getWrapper({ name: 'Trent' });
    submitForm(wrapper, { name: 'Trevor' });

    expect(localStorage.getItem('name')).toBe('Trevor');
  });
});
