// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { App } from './App';
import { setup, tests } from '../import-files';

export default createFixture({
  component: App,
  props: {
    commitSha: '24c2bd39be7cb2a5e17a671e5535525e364f8aaa',
    setup,
    tests
  }
});
