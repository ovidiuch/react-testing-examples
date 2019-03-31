// @flow

import { createFixture } from 'react-cosmos-classic';
import { Code } from '..';
import { testKinds } from '../../../../import-files';

export default [
  createFixture({
    component: Code,
    props: {
      code: testKinds['jest-enzyme'].tests[6].files['test.js'],
      showComments: true,
      showImports: false
    }
  })
];
