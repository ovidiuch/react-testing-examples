// @flow
/* eslint-env commonjs */

export const setup = {
  name: 'setup',
  readme: {
    text: require('!./webpack-loaders/readme-text-loader!../SETUP.md'),
    markup: require('../SETUP.md').default
  },
  code: {
    jest: {
      config: require('!raw-loader!../jest.config')
    },
    enzyme: {
      setup: require('!raw-loader!../enzyme.setup')
    },
    rtl: {
      setup: require('!raw-loader!../rtl.setup')
    }
  }
};

// NOTE: Tests are populated at compile time via import-tests-loader, because
// we're lazy (smart) and don't want to update this file whenever we add a test
export const tests = [];

// NOTE: This is also replaced at compile time with the latest commit SHA
export const gitRef = '';
