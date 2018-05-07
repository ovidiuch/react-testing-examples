import fs from 'fs';
import loader from './readme-text-loader';

let readme = fs.readFileSync('./5-react-router/README.md', 'utf8');
let output = loader(readme);
let json = JSON.parse(output.replace(/module.exports = {(.+)}/, '{$1}'));

it('extracts title', () => {
  expect(json.title).toBe('React Router load and change URL');
});

it('extracts body', () => {
  expect(json.body).toEqual([
    'The component is connected to React Router. It renders a variable text containing a URL parameter, as well as a Link to another location.',
    'First we make sure the component renders a param from the initial URL. Then we check that upon clicking on the Link element, the URL param from the new location is rendered, which proves that the page has successfully routed.',
    `Alternatively, we could just test the to prop of the Link element. That's also fine, but this test is closer to how a user thinks. Eg. "Click on a link, the page behind that link is rendered." This type of thinking makes tests more resilient against implementation changes, like upgrading the router library to a new API.`
  ]);
});
