// @flow

import React from 'react';
import styled from 'styled-components';

import type { Node } from 'react';

type Props = {
  label: Node,
  actions?: Node,
  isOpen: boolean,
  onClick: () => mixed
};

export function ToggleButton({ label, actions, isOpen, onClick }: Props) {
  return (
    <Container isOpen={isOpen}>
      <div className="button" onClick={onClick}>
        <span className="label">{label}</span> {isOpen ? '↑' : '↓'}
      </div>
      {actions && <div className="actions">{actions}</div>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 0 24px;
  height: 36px;
  line-height: 36px;
  background: ${props => (props.isOpen ? 'transparent' : '#ddd')};
  border-radius: 10px;
  user-select: none;
  transition: background 0.3s;

  .label {
    font-weight: 500;
  }

  .button {
    flex-grow: 1;
    cursor: pointer;

    :hover .label {
      text-decoration: underline;
    }
  }

  .actions {
    flex-grow: 0;
  }
`;
