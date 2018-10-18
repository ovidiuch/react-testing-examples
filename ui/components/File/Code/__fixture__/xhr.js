// @flow

import { createFixture } from 'react-cosmos';
import { Code } from '..';
import { tests } from '../../../../import-files';

export default [
  createFixture({
    component: Code,
    props: {
      code: tests[6].code.enzyme.test,
      showComments: true,
      showImports: false
    }
  })
];
