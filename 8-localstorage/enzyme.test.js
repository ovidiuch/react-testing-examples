// highlight{6-18,20,23-27}
import React from 'react';
import { mount } from 'enzyme';
import { LocalStorageMock } from '@react-mock/localstorage';
import { PersistentForm } from './component';

let wrapper;

beforeEach(() => {
  // Flush instances between tests to prevent leaking state
  wrapper = mount(
    <LocalStorageMock items={{ name: 'Trent' }}>
      <PersistentForm />
    </LocalStorageMock>
  );
});

it('renders cached name', async () => {
  expect(wrapper.text()).toContain(`Welcome, Trent`);
});

describe('on update', () => {
  beforeEach(() => {
    wrapper.find('input').instance().value = 'Trevor';
    wrapper.find('button').simulate('submit');
  });

  it('renders updated name', async () => {
    expect(wrapper.text()).toContain(`Welcome, Trevor`);
  });

  it('caches updated name', async () => {
    expect(localStorage.getItem('name')).toBe('Trevor');
  });
});
