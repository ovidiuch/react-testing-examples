import until from 'async-until';
import createContext from 'react-cosmos-test/enzyme';
import proxies from './cosmos.proxies';
import fixture from './fixture';

let { mount, getWrapper } = createContext({ proxies, fixture });

let notSyncing = () =>
  !getWrapper()
    .text()
    .match('Syncing...');

let simulateIncrement = async () => {
  getWrapper('button').simulate('click');
  await until(notSyncing);
};

beforeEach(mount);

it('renders initial count', async () => {
  await until(notSyncing);
  expect(getWrapper().text()).toContain(`Clicked 5 times`);
});

it('renders incremented count', async () => {
  await until(notSyncing);
  await simulateIncrement();
  await simulateIncrement();
  expect(getWrapper().text()).toContain(`Clicked 7 times`);
});
