// highlight{5,7-8}
import createContext from 'react-cosmos-test/enzyme';
import fixture from './fixture';

let { mount, getWrapper } = createContext({ fixture });

// Create fresh instances for each test to prevent leaking state
beforeEach(mount);

it('renders "Hello {name}"', () => {
  expect(getWrapper().text()).toContain('Hello Satoshi');
});
