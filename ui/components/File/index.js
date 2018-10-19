// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { FileOptions } from '../../contexts';
import { Center } from '../shared/styles';
import { Code } from './Code';
import { FileHeader } from './FileHeader';

type Props = {
  name: string,
  filePath: string,
  code: string
};

export class File extends Component<Props> {
  render() {
    const { name, filePath, code } = this.props;

    return (
      <Container>
        <FileOptions.Consumer>
          {({ showComments, showImports }) => (
            <>
              <FileHeader name={name} filePath={filePath} code={code} />
              <Code
                code={code}
                showComments={showComments}
                showImports={showImports}
              />
            </>
          )}
        </FileOptions.Consumer>
      </Container>
    );
  }
}

const Container = styled(Center)`
  margin-bottom: 16px;
`;
