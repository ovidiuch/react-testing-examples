// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { FileOptions } from '../contexts';
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

const FileContainer = styled.div`
  margin: 12px 0;
`;
