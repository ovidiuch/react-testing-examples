// @flow

import React, { Component } from 'react';
import ReactShow from 'react-show';

import type { Node } from 'react';

type Props = {
  header: ({ show: boolean, onToggle: () => mixed }) => Node,
  content: Node,
  show: boolean,
  onToggle: () => mixed
};

export class ToggleShow extends Component<Props> {
  render() {
    const { header, content, show, onToggle } = this.props;

    return (
      <>
        <div>{header({ show, onToggle })}</div>
        <ReactShow show={show}>{content}</ReactShow>
      </>
    );
  }
}
