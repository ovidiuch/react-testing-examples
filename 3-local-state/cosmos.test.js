import until from 'async-until';
import createContext from 'react-cosmos-test/enzyme';
import fixture from './fixture';

let { count } = fixture.state;
let { mount, getWrapper, getRef } = createContext({ fixture });

beforeEach(mount);

it('renders initial count', () => {
  expect(getWrapper().text()).toContain(`Clicked ${count} times`);
});
it('renders incremented count', () => {
  getWrapper('button').simulate('click');
  expect(getWrapper().text()).toContain(`Clicked ${count + 1} times`);
});
