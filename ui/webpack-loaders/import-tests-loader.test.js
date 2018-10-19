// @flow

import loader from './import-tests-loader';

const input = `
export const testKinds: TTestKinds = {};
export const gitRef: string = '';
`;
const output = loader.call({ addContextDependency: jest.fn() }, input);

it('embeds tests', () => {
  expect(output).toMatch('jest-enzyme');
  expect(output).toMatch('jest-rtl');
  expect(output).toMatch('1-click-callback');
  expect(output).toMatch('8-localstorage');
});
