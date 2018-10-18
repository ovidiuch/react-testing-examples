// @flow

import { createFixture } from 'react-cosmos';
import { Section } from '.';
import { tests } from '../../import-files';

export default [
  createFixture({
    name: 'Local component state',
    component: Section,
    props: {
      section: {
        type: 'test',
        test: tests[2]
      },
      testFilter: 'enzyme',
      searchText: ''
    }
  }),
  createFixture({
    name: 'Fetch test',
    component: Section,
    props: {
      section: {
        type: 'test',
        test: tests[6]
      },
      testFilter: 'enzyme',
      searchText: ''
    }
  })
];
