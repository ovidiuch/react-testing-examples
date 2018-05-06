// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { Test } from './Test';

export default createFixture({
  name: 'Redux',
  component: Test,
  props: {
    test: {
      name: 'redux',
      readme: {
        text: require('!../../server/readme-text-loader!../../../4-redux/README.md'),
        markup: require('../../../4-redux/README.md').default
      },
      code: {
        components: require('!raw-loader!../../../4-redux/components'),
        enzyme: {
          test: require('!raw-loader!../../../4-redux/enzyme.test')
        },
        cosmos: {
          test: require('!raw-loader!../../../4-redux/cosmos.test'),
          fixture: require('!raw-loader!../../../4-redux/fixture'),
          proxies: require('!raw-loader!../../../4-redux/cosmos.proxies')
        }
      }
    },
    testFilter: 'cosmos',
    searchText: 'Redux'
  }
});
