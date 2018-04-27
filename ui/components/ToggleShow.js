// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactShow from 'react-show';

import type { Node } from 'react';

type Props = {
  title: Node,
  content: Node,
  closed: boolean
};

type State = {
  isOpen: boolean
};

export class ToggleShow extends Component<Props, State> {
  state = {
    // Whe only what to derive state from prop initially and preserve local
    // state afterwards
    isOpen: !this.props.closed
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { title, content } = this.props;
    const { isOpen } = this.state;

    return (
      <Fragment>
        <div>
          <ToggleButton isOpen={isOpen} onClick={this.handleToggle}>
            <span className="title">{title}</span> {isOpen ? '↑' : '↓'}
          </ToggleButton>
        </div>
        <ReactShow show={isOpen}>{content}</ReactShow>
      </Fragment>
    );
  }
}

// ToggleButtons are positioned with z-index to ensure they are above the
// following section, which has negative offset at the top
const ToggleButton = styled.div`
  position: relative;
  z-index: 1;
  padding: 0 24px;
  height: 36px;
  line-height: 36px;
  background: ${props => (props.isOpen ? 'transparent' : '#ddd')};
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  transition: background 0.3s;

  .title {
    font-weight: 500;
  }

  :hover .title {
    text-decoration: underline;
  }
`;
