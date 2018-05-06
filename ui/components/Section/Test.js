// @flow

import React, { Component } from 'react';
import { CenterText } from '../shared/styles';
import { File } from '../File';
import { LeftRight } from './LeftRight';
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
    const { name, readme, files: { components } } = test;

    return (
      <>
        <CenterText>
          <Readme name={name} readme={readme} searchText={searchText} />
        </CenterText>
        <File
          name="components.js"
          filePath={`${name}/components.js`}
          code={components}
          closed
        />
        {this.renderTestFiles(test, testFilter)}
      </>
    );
  }

  renderTestFiles(test: TTest, testFilter: TTestFilter) {
    let { name, files } = test;
    let { enzyme, cosmos } = files;

    switch (testFilter) {
      case 'enzyme':
        return (
          <File
            name="test.js"
            filePath={`${name}/enzyme.test.js`}
            code={enzyme.test}
          />
        );
      case 'cosmos':
        return (
          <LeftRight
            left={
              <>
                <File
                  name="fixture.js"
                  filePath={`${name}/fixture.js`}
                  code={cosmos.fixture}
                />
                {cosmos.proxies && (
                  <File
                    name="proxies.js"
                    filePath={`${name}/cosmos.proxies.js`}
                    code={cosmos.proxies}
                    closed
                  />
                )}
              </>
            }
            right={
              <File
                name="test.js"
                filePath={`${name}/cosmos.test.js`}
                code={cosmos.test}
              />
            }
          />
        );
      default:
        throw new Error(`Invalid testFilter '${testFilter}'`);
    }
  }
}
