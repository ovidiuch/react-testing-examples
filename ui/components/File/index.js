// @flow

import React, { Component } from 'react';
import { FileOptions } from '../../contexts';
import { Center } from '../shared/styles';
import { ToggleShow } from '../shared/ToggleShow';
import { ToggleButton } from '../shared/ToggleButton';
import { Code } from './Code';
import { FileActions } from './FileActions';

type Props = {
  name: string,
  filePath: string,
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
    const { name, filePath, code } = this.props;
    const { isOpen } = this.state;

    return (
      <Container>
        <FileOptions.Consumer>
          {({ showComments, showImports }) => (
            <ToggleShow
              header={({ show, onToggle }) => (
                <ToggleButton
                  label={name}
                  actions={<FileActions filePath={filePath} code={code} />}
                  isOpen={show}
                  onClick={onToggle}
                />
              )}
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
      </Container>
    );
  }
}

const Container = Center.extend`
  margin: 12px auto;
`;
