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
      selTestKindId: 'jest-rtl'
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
      selTestKindId: 'jest-enzyme'
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
