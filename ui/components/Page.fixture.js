// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { Page } from './Page';

export default createFixture({
  component: Page,
  props: {
    setup: {
      title: 'Setup',
      files: {
        jest: require('!raw-loader!../../jest.setup'),
        enzyme: require('!raw-loader!../../enzyme.setup')
      }
    },
    tests: [
      {
        name: 'click callback',
        title: 'Callback fires on button click',
        files: {
          components: require('!raw-loader!../../1-click-callback/components'),
          enzyme: {
            test: require('!raw-loader!../../1-click-callback/enzyme.test')
          },
          cosmos: {
            test: require('!raw-loader!../../1-click-callback/cosmos.test'),
            fixture: require('!raw-loader!../../1-click-callback/fixture')
          }
        }
      },
      {
        name: '2-render-text',
        title: 'Text with prop value is rendered',
        files: {
          components: require('!raw-loader!../../2-render-text/components'),
          enzyme: {
            test: require('!raw-loader!../../2-render-text/enzyme.test')
          },
          cosmos: {
            test: require('!raw-loader!../../2-render-text/cosmos.test'),
            fixture: require('!raw-loader!../../2-render-text/fixture')
          }
        }
      },
      {
        name: '3-local-state',
        title: 'Local component state',
        files: {
          components: require('!raw-loader!../../3-local-state/components'),
          enzyme: {
            test: require('!raw-loader!../../3-local-state/enzyme.test')
          },
          cosmos: {
            test: require('!raw-loader!../../3-local-state/cosmos.test'),
            fixture: require('!raw-loader!../../3-local-state/fixture')
          }
        }
      },
      {
        name: '4-redux',
        title: 'Redux state and action',
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
    ]
  }
});
