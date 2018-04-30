// highlight{6,8-9}
import createContext from 'react-cosmos-test/enzyme';
import proxies from './cosmos.proxies';
import fixture from './fixture';

let { mount, getWrapper } = createContext({ proxies, fixture });

// Create fresh instances for each test to prevent leaking state
beforeEach(mount);

it('renders initial user id', () => {
  expect(getWrapper().text()).toContain(`User #5`);
});

it('renders next user id', () => {
  getWrapper('a')
    .find({ children: 'Next user' })
    // RR Link ignores clicks if event.button isn't 0 (eg. right click events)
    // https://github.com/airbnb/enzyme/issues/516
    .simulate('click', { button: 0 });

  expect(getWrapper().text()).toContain(`User #6`);
});
