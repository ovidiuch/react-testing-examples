// @flow

import React, { Component, Fragment } from 'react';
import { FileOptions } from '../contexts/FileOptions';
import { Test } from './Test';

import type { Test as TypeTest } from '../types';

type Props = {
  tests: Array<TypeTest>
};

type State = {
  showComments: boolean,
  showImports: boolean
};

export class Page extends Component<Props, State> {
  state = {
    showComments: true,
    showImports: false
  };

  handleToggleComments = () => {
    this.setState({ showComments: !this.state.showComments });
  };

  handleToggleImports = () => {
    this.setState({ showImports: !this.state.showImports });
  };

  render() {
    const { tests } = this.props;
    const { showComments, showImports } = this.state;

    return (
      <FileOptions.Provider value={{ showComments, showImports }}>
        <h1>React Testing Examples</h1>
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
        {tests.map(test => <Test test={test} />)}
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
        <input type="checkbox" checked={checked} onChange={onToggle} /> {name}
      </label>
    </Fragment>
  );
}
