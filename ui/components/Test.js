// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { File } from './File';

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
        <h2>{title}</h2>
        <div>
          <File name="components.js" code={components} closed />
          <Clear>
            <Left>
              <h3>Just Enzyme</h3>
              <File name="enzyme.test.js" code={enzyme.test} />
            </Left>
            <Right>
              <h3>Enzyme with Cosmos</h3>
              {cosmos.proxies && (
                <File name="cosmos.proxies.js" code={cosmos.proxies} closed />
              )}
              <File name="fixture.js" code={cosmos.fixture} />
              <File name="cosmos.test.js" code={cosmos.test} />
            </Right>
          </Clear>
        </div>
      </div>
    );
  }
}

const Left = styled.div`
  float: left;
  width: calc(50% - 6px);
`;

const Right = styled.div`
  float: right;
  width: calc(50% - 6px);
`;

const Clear = styled.div`
  overflow: hidden;
`;
