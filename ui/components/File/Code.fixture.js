// @flow

import { createFixture } from 'react-cosmos';
import { Code } from './Code';
import { tests } from '../../import-files';

export default [
  createFixture({
    name: 'XHR test',
    component: Code,
    props: {
      code: tests[4].code.enzyme.test,
      showComments: true,
      showImports: false
    }
  })
];
