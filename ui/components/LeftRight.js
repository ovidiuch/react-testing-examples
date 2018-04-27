// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import type { Node } from 'react';

type Props = {
  left: Node,
  right: Node
};

export class LeftRight extends Component<Props> {
  render() {
    const { left, right } = this.props;

    return (
      <Clear>
        <Left>{left}</Left>
        <Right>{right}</Right>
      </Clear>
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
