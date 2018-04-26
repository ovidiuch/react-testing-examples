// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { FileOptions } from '../contexts/FileOptions';

import type { Node } from 'react';

type Props = {
  name: string,
  code: string,
  closed: boolean
};

type State = {
  isOpen: boolean
};

export class File extends Component<Props, State> {
  static defaultProps = {
    closed: false
  };

  state = {
    // Whe only what to derive state from prop initially and preserve local
    // state afterwards
    isOpen: !this.props.closed
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { name, code } = this.props;
    const { isOpen } = this.state;

    return (
      <FileRoot>
        <FileOptions.Consumer>
          {({ showComments, showImports }) => (
            <Fragment>
              <div>
                <Toggle isOpen={isOpen} onToggle={this.handleToggle}>
                  {name}
                </Toggle>
              </div>
              {isOpen && (
                <Code>{stripCode(code, showComments, showImports)}</Code>
              )}
            </Fragment>
          )}
        </FileOptions.Consumer>
      </FileRoot>
    );
  }
}

function stripCode(code: string, showComments: boolean, showImports: boolean) {
  let cleanCode = code;

  if (!showComments) {
    // TODO: Support code blocks
    cleanCode = cleanCode.replace(/ *\/\/.+?\n/g, '');
  }

  if (!showImports) {
    cleanCode = cleanCode.replace(/^.*import([^\n]+);\n\n?/s, '');
  }

  return cleanCode;
}

type ToggleProps = {
  children: Node,
  isOpen: boolean,
  onToggle: () => mixed
};

function Toggle({ children, isOpen, onToggle }: ToggleProps) {
  return (
    <button onClick={onToggle}>
      {children} {isOpen ? '↑' : '↓'}
    </button>
  );
}

const FileRoot = styled.div`
  margin: 10px;
`;

const Code = styled.pre`
  background: #f1f1f1;
  border-radius: 3px;
  margin: 10px 0;
`;
