// highlight{6-18,20,23-27}
import React from 'react';
import { mount } from 'enzyme';
import { PersistentForm } from './components';

class LocalStorageMock {
  constructor(store = {}) {
    this.store = { ...store };
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }
}

let wrapper;

beforeEach(() => {
  // Set fresh mocks for each test
  global.localStorage = new LocalStorageMock({ name: 'Trent' });

  // Flush instances between tests to prevent leaking state
  wrapper = mount(<PersistentForm />);
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
