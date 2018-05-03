// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { App } from './App';

export default createFixture({
  component: App,
  props: {
    commitSha: '24c2bd39be7cb2a5e17a671e5535525e364f8aaa',
    setup: {
      name: 'setup',
      info: {
        title: 'Setup',
        description: [
          'A fixture is a JS object used to mock component input and external dependencies. The input can be props, children, state and context. With the help of proxies, fixtures can mock anything else a component depends on, from API responses to localStorage.'
        ]
      },
      files: {
        jest: require('!raw-loader!../../jest.setup'),
        enzyme: require('!raw-loader!../../enzyme.setup')
      }
    },
    tests: [
      {
        name: '1-click-callback',
        info: require('../../1-click-callback/README.md'),
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
        info: require('../../2-render-text/README.md'),
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
        info: require('../../3-local-state/README.md'),
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
        info: require('../../4-redux/README.md'),
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
        info: require('../../5-react-router/README.md'),
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
        info: require('../../6-xhr/README.md'),
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
        info: require('../../7-fetch/README.md'),
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
        info: require('../../8-localstorage/README.md'),
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
