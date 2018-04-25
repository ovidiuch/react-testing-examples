import React from 'react';
import { mount } from 'enzyme';
import { PersistentForm } from './components';

export class LocalStorageMock {
  constructor(store = {}) {
    this.store = { ...store };
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

let nativeLocalStorage = global.localStorage;
let wrapper;

beforeEach(() => {
  global.localStorage = new LocalStorageMock({ name: 'Trent' });
  wrapper = mount(<PersistentForm />);
});

afterEach(() => {
  global.localStorage = nativeLocalStorage;
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
