// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { App } from './App';

export default createFixture({
  component: App,
  props: {
    commitSha: '24c2bd39be7cb2a5e17a671e5535525e364f8aaa',
    setup: {
      name: 'setup',
      readme: {
        text: require('!../server/readme-text-loader!../../SETUP.md'),
        markup: require('../../SETUP.md').default
      },
      files: {
        jest: require('!raw-loader!../../jest.setup'),
        enzyme: require('!raw-loader!../../enzyme.setup')
      }
    },
    tests: [
      {
        name: '1-click-callback',
        readme: {
          text: require('!../server/readme-text-loader!../../1-click-callback/README.md'),
          markup: require('../../1-click-callback/README.md').default
        },
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
        readme: {
          text: require('!../server/readme-text-loader!../../2-render-text/README.md'),
          markup: require('../../2-render-text/README.md').default
        },
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
        readme: {
          text: require('!../server/readme-text-loader!../../3-local-state/README.md'),
          markup: require('../../3-local-state/README.md').default
        },
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
        readme: {
          text: require('!../server/readme-text-loader!../../4-redux/README.md'),
          markup: require('../../4-redux/README.md').default
        },
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
        readme: {
          text: require('!../server/readme-text-loader!../../5-react-router/README.md'),
          markup: require('../../5-react-router/README.md').default
        },
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
        readme: {
          text: require('!../server/readme-text-loader!../../6-xhr/README.md'),
          markup: require('../../6-xhr/README.md').default
        },
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
        readme: {
          text: require('!../server/readme-text-loader!../../7-fetch/README.md'),
          markup: require('../../7-fetch/README.md').default
        },
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
        readme: {
          text: require('!../server/readme-text-loader!../../8-localstorage/README.md'),
          markup: require('../../8-localstorage/README.md').default
        },
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
