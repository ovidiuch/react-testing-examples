// @flow

import React from 'react';
import styled from 'styled-components';
import { FileOptions } from '../../contexts';

type FileOptionCheckboxProps = {
  onToggle: () => mixed
};

export function CommentsCheckbox({ onToggle }: FileOptionCheckboxProps) {
  return (
    <FileOptions.Consumer>
      {({ showComments }) => (
        <Checkbox name="comments" checked={showComments} onToggle={onToggle} />
      )}
    </FileOptions.Consumer>
  );
}

export function ImportsCheckbox({ onToggle }: FileOptionCheckboxProps) {
  return (
    <FileOptions.Consumer>
      {({ showImports }) => (
        <Checkbox name="imports" checked={showImports} onToggle={onToggle} />
      )}
    </FileOptions.Consumer>
  );
}

type CheckboxProps = {
  name: string,
  checked: boolean,
  onToggle: () => mixed
};

function Checkbox({ name, checked, onToggle }: CheckboxProps) {
  return (
    <CheckboxLabel>
      <input type="checkbox" checked={checked} onChange={onToggle} />
      {name}
    </CheckboxLabel>
  );
}

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 12px;
  line-height: 24px;
  user-select: none;

  :last-child {
    margin-right: 8px;
  }

  input {
    margin-right: 4px;
  }
`;
