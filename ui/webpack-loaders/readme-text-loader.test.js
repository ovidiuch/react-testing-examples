import fs from 'fs';
import loader from './readme-text-loader';

let readme = fs.readFileSync(
  './tests/jest-enzyme/5-react-router/README.md',
  'utf8'
);
let output = loader(readme);
let json = JSON.parse(output.replace(/module.exports = {(.+)}/, '{$1}'));

it('extracts title', () => {
  expect(json.title).toBe('React Router load and change URL');
});

it('extracts body', () => {
  expect(json.body).toEqual([
    'The component is connected to React Router. It renders a variable text containing a URL parameter, as well as a Link to another location.',
    'First we make sure the component renders a param from the initial URL. Then we check that the URL param from a new location is rendered upon clicking on the Link element, which proves that the page has successfully routed.',
    `Alternatively, we could just test the to prop of the Link element. That's also fine. But this test is closer to how a user thinks: Click on a link. Did the linked page open?`,
    `This type of thinking makes tests more resilient against implementation changes, like upgrading the router library to a new API.`
  ]);
});
