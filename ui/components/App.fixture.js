// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { App } from './App';
import { setup, tests, gitRef } from '../import-files';

export default createFixture({
  component: App,
  props: {
    gitRef,
    setup,
    tests
  }
});
