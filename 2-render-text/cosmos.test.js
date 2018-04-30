// highlight{5,7-8}
import createContext from 'react-cosmos-test/enzyme';
import fixture from './fixture';

let { mount, getWrapper } = createContext({ fixture });

// Flush instances between tests to prevent leaking state
beforeEach(mount);

it('renders personalized greeting', () => {
  expect(getWrapper().text()).toContain('Hello Satoshi');
});
