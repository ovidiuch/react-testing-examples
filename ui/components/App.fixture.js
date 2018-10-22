// @flow

import { createFixture } from 'react-cosmos';
import { App } from './App';
import { gitRef } from '../import-files';
import { getTestKind } from '../shared/testKinds';

export default [
  createFixture({
    name: 'react-testing-library',
    component: App,
    props: {
      gitRef,
      testKind: getTestKind('jest-rtl'),
      showAbout: false
    },
    state: {}
  }),
  createFixture({
    name: 'Enzyme',
    component: App,
    props: {
      gitRef,
      testKind: getTestKind('jest-enzyme'),
      showAbout: false
    },
    state: {}
  }),
  createFixture({
    name: 'About',
    component: App,
    props: {
      gitRef,
      testKind: getTestKind('jest-rtl'),
      showAbout: true
    }
  })
];
