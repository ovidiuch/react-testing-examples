// @flow

import React, { Component, Fragment } from 'react';
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
          <button onClick={this.handleToggle}>
            {title} {isOpen ? '↑' : '↓'}
          </button>
        </div>
        <ReactShow show={isOpen}>{content}</ReactShow>
      </Fragment>
    );
  }
}
