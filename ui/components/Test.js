// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Title } from '../styles';
import { File } from './File';
import { LeftRight } from './LeftRight';

import type { Test as TypeTest } from '../types';

type Props = {
  test: TypeTest
};

export class Test extends Component<Props> {
  render() {
    const { title, files } = this.props.test;
    const { components, enzyme, cosmos } = files;

    return (
      <div>
        <Title>{title}</Title>
        <div>
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
                  <File name="cosmos.proxies.js" code={cosmos.proxies} closed />
                )}
                <File name="fixture.js" code={cosmos.fixture} />
                <File name="cosmos.test.js" code={cosmos.test} />
              </Fragment>
            }
          />
        </div>
      </div>
    );
  }
}

const TitleTestType = styled.h3`
  padding: 12px 0 0 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1em;
  text-align: center;
  text-transform: uppercase;
  opacity: 0.4;
`;
