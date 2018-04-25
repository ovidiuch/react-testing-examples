import createContext from 'react-cosmos-test/enzyme';
import proxies from './cosmos.proxies';
import fixture from './fixture';

let { mount, getWrapper } = createContext({ proxies, fixture });

beforeEach(mount);

it('renders cached name', async () => {
  expect(getWrapper().text()).toContain(`Welcome, Trent`);
});

describe('on update', () => {
  beforeEach(() => {
    getWrapper('input').instance().value = 'Trevor';
    getWrapper('button').simulate('submit');
  });

  it('renders updated name', async () => {
    expect(getWrapper().text()).toContain(`Welcome, Trevor`);
  });

  it('caches updated name', async () => {
    expect(localStorage.getItem('name')).toBe('Trevor');
  });
});
