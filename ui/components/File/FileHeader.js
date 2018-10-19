// @flow

import React from 'react';
import styled from 'styled-components';
import { FileActions } from './FileActions';

type Props = {
  name: string,
  filePath: string,
  code: string
};

export function FileHeader({ name, filePath, code }: Props) {
  return (
    <Container>
      <Label>{name}</Label>
      <Actions>
        <FileActions filePath={filePath} code={code} />
      </Actions>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 0 24px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  transition: background 0.3s;
`;

const Label = styled.div`
  flex-grow: 1;
  color: rgba(32, 35, 42, 0.7);
  font-weight: 500;
`;

const Actions = styled.div`
  flex-grow: 0;
`;
