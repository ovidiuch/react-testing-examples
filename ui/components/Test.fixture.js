// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { Test } from './Test';

export default createFixture({
  component: Test,
  props: {
    test: {
      name: 'redux',
      title: 'Redux state and actions',
      files: {
        components: require('!raw-loader!../../4-redux/components'),
        enzyme: {
          test: require('!raw-loader!../../4-redux/enzyme.test')
        },
        cosmos: {
          test: require('!raw-loader!../../4-redux/cosmos.test'),
          fixture: require('!raw-loader!../../4-redux/fixture'),
          proxies: require('!raw-loader!../../4-redux/cosmos.proxies')
        }
      }
    }
  }
});
