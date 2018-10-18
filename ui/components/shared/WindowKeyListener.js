// @flow
/* eslint-env browser */

import { Component } from 'react';

import type { Node } from 'react';

type Props = {
  children: Node,
  onKeyDown: (e: SyntheticKeyboardEvent<HTMLElement>) => mixed
};

export class WindowKeyListener extends Component<Props> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: SyntheticKeyboardEvent<HTMLElement>) => {
    this.props.onKeyDown(e);
  };

  render() {
    return this.props.children;
  }
}

export const KEY_S = 83;
export const KEY_ESC = 27;
