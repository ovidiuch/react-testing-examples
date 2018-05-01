// @flow

import React, { Component } from 'react';
import { FileOptions } from '../contexts';
import { Center } from '../styles';
import { Code } from './Code';
import { ToggleShow } from './ToggleShow';

type Props = {
  name: string,
  code: string,
  closed: boolean
};

export class File extends Component<Props> {
  static defaultProps = {
    closed: false
  };

  render() {
    const { name, code, closed } = this.props;

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
              closed={closed}
            />
          )}
        </FileOptions.Consumer>
      </FileContainer>
    );
  }
}

const FileContainer = Center.extend`
  margin-top: 12px;
`;
