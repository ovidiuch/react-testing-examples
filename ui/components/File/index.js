// @flow

import React, { Component } from 'react';
import { FileOptions } from '../../contexts';
import { Center } from '../../styles';
import { ToggleShow } from '../shared/ToggleShow';
import { Code } from './Code';

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
      <FileContainer>
        <FileOptions.Consumer>
          {({ showComments, showImports }) => (
            <ToggleShow
              title={name}
              content={
                <Code
                  code={code}
                  showComments={showComments}
                  showImports={showImports}
                />
              }
              show={isOpen}
              onToggle={this.handleToggle}
            />
          )}
        </FileOptions.Consumer>
      </FileContainer>
    );
  }
}

const FileContainer = Center.extend`
  margin: 12px auto;
`;
