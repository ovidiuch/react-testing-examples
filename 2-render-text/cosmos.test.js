import createContext from 'react-cosmos-test/enzyme';
import fixture from './fixture';

let { mount, getWrapper } = createContext({ fixture });

beforeEach(mount);

it('renders "Hello {name}"', () => {
  expect(getWrapper().text()).toContain('Hello Satoshi');
});
