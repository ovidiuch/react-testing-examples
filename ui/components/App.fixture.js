// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { App } from './App';
import { setup, tests, gitRef } from '../import-files';

// TODO: Rename "commitSha" to "gitRef"
export default createFixture({
  component: App,
  props: {
    commitSha: gitRef,
    setup,
    tests
  }
});
