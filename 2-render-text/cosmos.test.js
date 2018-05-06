// highlight{5-6,8-9}
import createContext from 'react-cosmos-test/enzyme';
import fixture from './fixture';

let { mount, getWrapper } = createContext({ fixture });
let { name } = fixture.props;

// Flush instances between tests to prevent leaking state
beforeEach(mount);

it('renders personalized greeting', () => {
  expect(getWrapper().text()).toContain(`Hello ${name}`);
});
