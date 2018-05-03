// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import ReactShow from 'react-show';

import type { Node } from 'react';

type Props = {
  title: Node,
  content: Node,
  show: boolean,
  onToggle: () => mixed
};

export class ToggleShow extends Component<Props> {
  render() {
    const { title, content, show, onToggle } = this.props;

    return (
      <>
        <div>
          <ToggleButton isOpen={show} onClick={onToggle}>
            <span className="title">{title}</span> {show ? '↑' : '↓'}
          </ToggleButton>
        </div>
        <ReactShow show={show}>{content}</ReactShow>
      </>
    );
  }
}

const ToggleButton = styled.div`
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
