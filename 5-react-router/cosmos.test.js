import createContext from 'react-cosmos-test/enzyme';
import proxies from './cosmos.proxies';
import fixture from './fixture';

let { mount, getWrapper } = createContext({ proxies, fixture });

beforeEach(mount);

it('renders initial user id', () => {
  expect(getWrapper().text()).toContain(`User #5`);
});

it('renders next user id', () => {
  getWrapper('a')
    .find({ children: 'Next user' })
    // RR Link requires event.button to be 0 to follow with click events.
    // This is how it knows to ignore right click events.
    // https://github.com/airbnb/enzyme/issues/516
    .simulate('click', { button: 0 });

  expect(getWrapper().text()).toContain(`User #6`);
});
