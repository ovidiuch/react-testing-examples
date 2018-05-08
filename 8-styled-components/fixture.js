// highlight{5-9,11-15}
import { HelloMessage } from './components';
import { themeLight, themeDark } from './theme';

const fixtureLight = {
  component: HelloMessage,
  theme: themeLight,
  children: 'Hello world!'
};

const fixtureDark = {
  component: HelloMessage,
  theme: themeDark,
  children: 'Hello world!'
};

// Tip: Fixture files can also export an array
export default [fixtureLight, fixtureDark];
