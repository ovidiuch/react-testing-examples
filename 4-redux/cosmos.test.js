import createContext from 'react-cosmos-test/enzyme';
import proxies from './cosmos.proxies';
import fixture from './fixture';

let { count } = fixture.reduxState;
let { mount, getWrapper } = createContext({ proxies, fixture });

// Create fresh instances for each test to prevent leaking state
beforeEach(mount);

it('renders initial count', () => {
  expect(getWrapper().text()).toContain(`Clicked ${count} times`);
});

it('renders incremented count', () => {
  getWrapper('button').simulate('click');
  expect(getWrapper().text()).toContain(`Clicked ${count + 1} times`);
});
