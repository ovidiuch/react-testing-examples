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
      },
      {
        name: '5-react-router',
        title: 'React Router load and change URL',
        files: {
          components: require('!raw-loader!../../5-react-router/components'),
          enzyme: {
            test: require('!raw-loader!../../5-react-router/enzyme.test')
          },
          cosmos: {
            test: require('!raw-loader!../../5-react-router/cosmos.test'),
            fixture: require('!raw-loader!../../5-react-router/fixture'),
            proxies: require('!raw-loader!../../5-react-router/cosmos.proxies')
          }
        }
      },
      {
        name: '6-xhr',
        title: 'XHR requests',
        files: {
          components: require('!raw-loader!../../6-xhr/components'),
          enzyme: {
            test: require('!raw-loader!../../6-xhr/enzyme.test')
          },
          cosmos: {
            test: require('!raw-loader!../../6-xhr/cosmos.test'),
            fixture: require('!raw-loader!../../6-xhr/fixture'),
            proxies: require('!raw-loader!../../6-xhr/cosmos.proxies')
          }
        }
      },
      {
        name: '7-fetch',
        title: 'Fetch requests',
        files: {
          components: require('!raw-loader!../../7-fetch/components'),
          enzyme: {
            test: require('!raw-loader!../../7-fetch/enzyme.test')
          },
          cosmos: {
            test: require('!raw-loader!../../7-fetch/cosmos.test'),
            fixture: require('!raw-loader!../../7-fetch/fixture'),
            proxies: require('!raw-loader!../../7-fetch/cosmos.proxies')
          }
        }
      },
      {
        name: '8-localstorage',
        title: 'LocalStorage read and write',
        files: {
          components: require('!raw-loader!../../8-localstorage/components'),
          enzyme: {
            test: require('!raw-loader!../../8-localstorage/enzyme.test')
          },
          cosmos: {
            test: require('!raw-loader!../../8-localstorage/cosmos.test'),
            fixture: require('!raw-loader!../../8-localstorage/fixture'),
            proxies: require('!raw-loader!../../8-localstorage/cosmos.proxies')
          }
        }
      }
    ]
  }
});
