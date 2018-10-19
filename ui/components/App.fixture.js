// @flow

import { createFixture } from 'react-cosmos';
import { App } from './App';
import { testKinds, gitRef } from '../import-files';

export default [
  createFixture({
    name: 'react-testing-library',
    component: App,
    props: {
      gitRef,
      testKinds,
      showAbout: false
    },
    state: {
      testFilter: 'jest-rtl'
    }
  }),
  createFixture({
    name: 'Enzyme',
    component: App,
    props: {
      gitRef,
      testKinds,
      showAbout: false
    },
    state: {
      testFilter: 'jest-enzyme'
    }
  }),
  createFixture({
    name: 'About',
    component: App,
    props: {
      gitRef,
      testKinds,
      showAbout: true
    }
  })
];
