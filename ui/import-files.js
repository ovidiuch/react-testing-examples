// @flow

export const setup = {
  name: 'setup',
  readme: {
    text: require('!./webpack-loaders/readme-text-loader!../SETUP.md'),
    markup: require('../SETUP.md').default
  },
  code: {
    jest: {
      config: require('!raw-loader!../jest.config'),
      setup: require('!raw-loader!../jest.setup')
    },
    enzyme: require('!raw-loader!../enzyme.setup')
  }
};

// XXX: Tests are populated at compile time via import-tests-loader, because
// we're lazy and don't want to update this file whenever we add a test
export const tests = [];

// XXX: This is also replaced at compile time with the latest commit SHA
export const gitRef = '';
