// highlight{11-16}
import createContext from 'react-cosmos-test/enzyme';
import proxies from './cosmos.proxies';
import fixtures from './fixture';

let [fixtureLight, fixtureDark] = fixtures;

// Mounting is sync for this example, but it's best to always assume mounting
// a fixture is async to not have to think about it on a case by case
async function getClassName(fixture) {
  let { mount, getWrapper } = createContext({ proxies, fixture });
  await mount();

  // Even though we render the component inside the ThemeProvider, the
  // getWrapper method returns the HelloMessage child wrapper
  return getWrapper('span').prop('className');
}

it('changes styles with theme', async () => {
  expect(await getClassName(fixtureLight)).not.toEqual(
    await getClassName(fixtureDark)
  );
});
