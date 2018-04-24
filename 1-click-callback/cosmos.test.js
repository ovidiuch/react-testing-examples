import createContext from 'react-cosmos-test/enzyme';
import fixture from './fixture';

let { mount, getWrapper } = createContext({ fixture });

beforeEach(mount);

it('calls "onClick" prop on button click', () => {
  getWrapper('button').simulate('click');
  expect(getWrapper().prop('onClick')).toHaveBeenCalled();
});
