// highlight{10-12}
import React from 'react';
import { mount } from 'enzyme';
import { LocalStorageMock } from '@react-mock/localstorage';
import { PersistentForm } from './component';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ name }) =>
  mount(
    <LocalStorageMock items={{ name }}>
      <PersistentForm />
    </LocalStorageMock>
  );

const submitForm = ({ wrapper, name }) => {
  wrapper.find('input').instance().value = name;
  wrapper.find('button').simulate('submit');
};

it('renders cached name', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ name: 'Trent' });

  expect(wrapper.text()).toMatch('Welcome, Trent');
});

describe('on update', () => {
  it('renders updated name', () => {
    // Render new instance in every test to prevent leaking state
    const wrapper = getWrapper({ name: 'Trent' });
    submitForm({ wrapper, name: 'Trevor' });

    expect(wrapper.text()).toMatch('Welcome, Trevor');
  });

  it('updates LocalStorage cache', () => {
    // Render new instance in every test to prevent leaking state
    const wrapper = getWrapper({ name: 'Trent' });
    submitForm({ wrapper, name: 'Trevor' });

    expect(localStorage.getItem('name')).toBe('Trevor');
  });
});
