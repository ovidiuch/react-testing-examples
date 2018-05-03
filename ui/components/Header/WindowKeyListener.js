// @flow

import { Component } from 'react';

import type { Node } from 'react';

type Props = {
  children: Node,
  onKeyDown: (e: SyntheticKeyboardEvent<HTMLElement>) => mixed
};

export class WindowKeyListener extends Component<Props> {
  componentDidMount() {
    global.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    global.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: SyntheticKeyboardEvent<HTMLElement>) => {
    this.props.onKeyDown(e);
  };

  render() {
    return this.props.children;
  }
}
