// @flow

import React, { Component } from 'react';
import { CenterText } from '../shared/styles';
import { File } from '../File';
import { Readme } from './Readme';

import type { TTestFilter, TTest } from '../../types';

type Props = {
  test: TTest,
  testFilter: TTestFilter,
  searchText: string
};

export class Test extends Component<Props> {
  render() {
    const { test, testFilter, searchText } = this.props;
    const {
      name,
      readme,
      code: { component }
    } = test;

    return (
      <>
        <CenterText>
          <Readme name={name} readme={readme} searchText={searchText} />
        </CenterText>
        <File
          name="component.js"
          filePath={`${name}/component.js`}
          code={component}
          closed
        />
        {this.renderTestFiles(test, testFilter)}
      </>
    );
  }

  renderTestFiles(test: TTest, testFilter: TTestFilter) {
    let { name, code } = test;
    let { enzyme } = code;

    switch (testFilter) {
      case 'enzyme':
        return (
          <File
            name="test.js"
            filePath={`${name}/enzyme.test.js`}
            code={enzyme.test}
          />
        );

      default:
        throw new Error(`Invalid testFilter '${testFilter}'`);
    }
  }
}
