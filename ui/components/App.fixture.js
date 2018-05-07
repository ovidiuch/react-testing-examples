// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { App } from './App';
import { setup, tests, gitRef } from '../import-files';

export default [
  createFixture({
    name: 'index',
    component: App,
    props: {
      gitRef,
      setup,
      tests,
      showAbout: false
    }
  }),
  createFixture({
    name: 'about',
    component: App,
    props: {
      gitRef,
      setup,
      tests,
      showAbout: true
    }
  })
];
