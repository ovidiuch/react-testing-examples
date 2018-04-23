import createContext from 'react-cosmos-test/enzyme';
import fixture from './fixture';

const { mount, getWrapper } = createContext({ fixture });

beforeEach(mount);

it('should call "onClick" prop on button click', () => {
  mount();
  getWrapper('button').simulate('click');
  expect(getWrapper().prop('onClick')).toHaveBeenCalled();
});
