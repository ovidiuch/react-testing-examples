// highlight{5,7-8}
import createContext from 'react-cosmos-test/enzyme';
import fixture from './fixture';

let { mount, getWrapper } = createContext({ fixture });

// Create fresh instances for each test to prevent leaking state
beforeEach(mount);

it('calls "onClick" prop on button click', () => {
  getWrapper('button').simulate('click');
  expect(getWrapper().prop('onClick')).toHaveBeenCalled();
});
