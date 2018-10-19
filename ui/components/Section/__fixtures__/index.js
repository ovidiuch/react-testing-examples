// @flow

import { createFixture } from 'react-cosmos';
import { Section } from '..';
import { testKinds } from '../../../import-files';

export default [
  createFixture({
    name: 'Local component state',
    component: Section,
    props: {
      testKindId: 'jest-enzyme',
      section: testKinds['jest-enzyme'].tests[2],
      searchText: ''
    }
  }),
  createFixture({
    name: 'Fetch test',
    component: Section,
    props: {
      testKindId: 'jest-enzyme',
      section: testKinds['jest-enzyme'].tests[6],
      searchText: ''
    }
  })
];
