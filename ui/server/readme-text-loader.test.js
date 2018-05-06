import fs from 'fs';
import loader from './readme-text-loader';

let readme = fs.readFileSync('./5-react-router/readme.md', 'utf8');
let output = loader(readme);
let json = JSON.parse(output.replace(/module.exports = {(.+)}/, '{$1}'));

it('extracts title', () => {
  expect(json.title).toBe('React Router load and change URL');
});

it('extracts body', () => {
  expect(json.body).toEqual([
    'The component is connected to React Router. It renders a variable text containing a URL parameter, as well as a Link to go to another location.',
    "First we check that the component's render output contains a param from the initial URL. Then we check that by clicking on the Link, the URL param from the new location is rendered, which proves that the page has successfully changed.",
    'A different strategy would be to simply check the to prop of the rendered Link element. That\'s also fine, but this test is closer to how a user thinks: "Click on a link, the page behind that link is rendered". This sort of thinking makes tests more resilient against implementation changes, like changing the router library.'
  ]);
});
