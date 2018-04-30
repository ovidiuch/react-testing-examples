// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Search } from '../contexts';
import { Title } from '../styles';
import { File } from './File';
import { LeftRight } from './LeftRight';
import { FuzzyHighlighter } from './FuzzyHighlighter';

import type { Test as TypeTest } from '../types';

type Props = {
  test: TypeTest
};

export class Test extends Component<Props> {
  render() {
    const { title, files } = this.props.test;
    const { components, enzyme, cosmos } = files;

    return (
      <Search.Consumer>
        {searchText => (
          <Fragment>
            <Title>
              <FuzzyHighlighter searchText={searchText} targetText={title} />
            </Title>
            <LeftRight
              left={<File name="components.js" code={components} closed />}
            />
            <LeftRight
              left={
                <Fragment>
                  <TitleTestType>Enzyme</TitleTestType>
                  <File name="enzyme.test.js" code={enzyme.test} />
                </Fragment>
              }
              right={
                <Fragment>
                  <TitleTestType>Enzyme & Cosmos</TitleTestType>
                  {cosmos.proxies && (
                    <File
                      name="cosmos.proxies.js"
                      code={cosmos.proxies}
                      closed
                    />
                  )}
                  <File name="fixture.js" code={cosmos.fixture} />
                  <File name="cosmos.test.js" code={cosmos.test} />
                </Fragment>
              }
            />
          </Fragment>
        )}
      </Search.Consumer>
    );
  }
}

const TitleTestType = styled.h3`
  padding: 12px 0 0 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1em;
  text-align: center;
  text-transform: uppercase;
  opacity: 0.4;
`;
