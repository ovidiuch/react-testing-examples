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
      <Container>
        <Left>{left}</Left>
        <Right>{right}</Right>
      </Container>
    );
  }
}

const Container = styled.div`
  @media (min-width: 1120px) {
    overflow: hidden;
  }
`;

const Left = styled.div`
  @media (min-width: 1120px) {
    float: left;
    width: calc(50% - 6px);
  }
`;

const Right = styled.div`
  @media (min-width: 1120px) {
    float: right;
    width: calc(50% - 6px);
  }
`;
