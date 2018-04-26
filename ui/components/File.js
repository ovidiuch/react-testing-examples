// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

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

  static getDerivedStateFromProps({ closed }: Props) {
    return {
      isOpen: !closed
    };
  }

  state = {
    isOpen: true
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { name, code } = this.props;
    const { isOpen } = this.state;

    return (
      <FileRoot>
        <div>
          {name} <Toggle isOpen={isOpen} onToggle={this.handleToggle} />
        </div>
        {isOpen && <Code>{code}</Code>}
      </FileRoot>
    );
  }
}

type ToggleProps = {
  isOpen: boolean,
  onToggle: () => mixed
};

function Toggle({ isOpen, onToggle }: ToggleProps) {
  return <button onClick={onToggle}>{isOpen ? '↑' : '↓'}</button>;
}

const FileRoot = styled.div`
  margin: 10px;
`;

const Code = styled.pre`
  background: #f1f1f1;
  border-radius: 3px;
  margin: 10px 0;
`;
