// @flow

import React, { Component } from 'react';
import { TestFilter, Search } from '../contexts';
import { Description } from '../styles';
import { File } from './File';
import { LeftRight } from './LeftRight';
import { FuzzyHighlighter } from './FuzzyHighlighter';
import { TitleLink } from './TitleLink';

import type { TTestFilter, TTest } from '../types';

type Props = {
  test: TTest
};

export class Test extends Component<Props> {
  render() {
    const { test } = this.props;
    const { name, info: { title, description }, files: { components } } = test;

    return (
      <TestFilter.Consumer>
        {testFilter => (
          <Search.Consumer>
            {searchText => (
              <>
                <TitleLink link={name}>
                  <FuzzyHighlighter
                    searchText={searchText}
                    targetText={title}
                  />
                </TitleLink>
                {description.map((p, idx) => (
                  <Description key={idx}>
                    <FuzzyHighlighter searchText={searchText} targetText={p} />
                  </Description>
                ))}
                <File name="components.js" code={components} closed />
                {this.renderTestFiles(test, testFilter)}
              </>
            )}
          </Search.Consumer>
        )}
      </TestFilter.Consumer>
    );
  }

  renderTestFiles(test: TTest, testFilter: TTestFilter) {
    let { enzyme, cosmos } = test.files;

    switch (testFilter) {
      case 'enzyme':
        return <File name="test.js" code={enzyme.test} />;
      case 'cosmos':
        return (
          <LeftRight
            left={
              <>
                <File name="fixture.js" code={cosmos.fixture} />
                {cosmos.proxies && (
                  <File name="proxies.js" code={cosmos.proxies} closed />
                )}
              </>
            }
            right={<File name="test.js" code={cosmos.test} />}
          />
        );
      default:
        throw new Error(`Invalid testFilter '${testFilter}'`);
    }
  }
}
