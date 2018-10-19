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
  padding: 0 0;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  user-select: none;
  transition: background 0.3s;
  text-transform: uppercase;

  .label {
    font-weight: 700;
  }

  .button {
    flex-grow: 1;
    cursor: pointer;
    opacity: ${props => (props.isOpen ? 0.6 : 0.8)};
    transition: opacity 0.3s;

    :hover .label {
      text-decoration: underline;
    }
  }

  .actions {
    flex-grow: 0;
  }
`;
