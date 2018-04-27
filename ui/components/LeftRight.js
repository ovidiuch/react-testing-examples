// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import type { Node } from 'react';

type Props = {
  left?: Node,
  right?: Node
};

// TODO: Create Center component
// TODO: Handle small screens
export class LeftRight extends Component<Props> {
  render() {
    const { left, right } = this.props;

    return (
      <Clear>
        {left && <Left>{left}</Left>}
        {right && <Right>{right}</Right>}
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
