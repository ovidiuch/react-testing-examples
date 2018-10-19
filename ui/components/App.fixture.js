// @flow

import { createFixture } from 'react-cosmos';
import { App } from './App';
import { testKinds, gitRef } from '../import-files';

export default [
  createFixture({
    name: 'index',
    component: App,
    props: {
      gitRef,
      testKinds,
      showAbout: false
    }
  }),
  createFixture({
    name: 'about',
    component: App,
    props: {
      gitRef,
      testKinds,
      showAbout: true
    }
  })
];
