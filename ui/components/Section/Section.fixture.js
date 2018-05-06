// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { Section } from '.';
import { tests } from '../../import-files';

export default createFixture({
  name: 'Redux Test',
  component: Section,
  props: {
    section: {
      type: 'test',
      test: tests[4]
    },
    testFilter: 'cosmos',
    searchText: 'Redux'
  }
});
