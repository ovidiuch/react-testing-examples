// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { File } from './File';
import { FileOptions } from '../contexts/FileOptions';

import type { Test as TypeTest } from '../types';

type Props = {
  test: TypeTest
};

type State = {
  showComments: boolean,
  showImports: boolean
};

export class Test extends Component<Props, State> {
  state = {
    showComments: false,
    showImports: false
  };

  handleToggleComments = () => {
    this.setState({ showComments: !this.state.showComments });
  };

  handleToggleImports = () => {
    this.setState({ showImports: !this.state.showImports });
  };

  render() {
    const { title, files } = this.props.test;
    const { components, enzyme, cosmos } = files;
    const { showComments, showImports } = this.state;

    return (
      <FileOptions.Provider value={{ showComments, showImports }}>
        <h2>{title}</h2>
        <div>
          <Checkbox
            name="comments"
            checked={showComments}
            onToggle={this.handleToggleComments}
          />
          <Checkbox
            name="imports"
            checked={showImports}
            onToggle={this.handleToggleImports}
          />
        </div>
        <div>
          <File name="components.js" code={components} closed />
          <Left>
            <File name="enzyme.test.js" code={enzyme.test} />
          </Left>
          <Right>
            {cosmos.proxies && (
              <File name="cosmos.proxies.js" code={cosmos.proxies} closed />
            )}
            <File name="fixture.js" code={cosmos.fixture} />
            <File name="cosmos.test.js" code={cosmos.test} />
          </Right>
        </div>
      </FileOptions.Provider>
    );
  }
}

type CheckboxProps = {
  name: string,
  checked: boolean,
  onToggle: () => mixed
};

function Checkbox({ name, checked, onToggle }: CheckboxProps) {
  return (
    <Fragment>
      <label>
        <input type="checkbox" checked={checked} onClick={onToggle} /> {name}
      </label>
    </Fragment>
  );
}

const Left = styled.div`
  float: left;
`;

const Right = styled.div`
  float: left;
`;
