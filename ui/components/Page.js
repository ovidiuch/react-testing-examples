// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { FileOptions } from '../contexts/FileOptions';
import { ToggleShow } from './ToggleShow';
import { Setup } from './Setup';
import { Test } from './Test';

import type { Setup as TypeSetup, Test as TypeTest } from '../types';

type Props = {
  setup: TypeSetup,
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
    const { setup, tests } = this.props;
    const { showComments, showImports } = this.state;

    return (
      <FileOptions.Provider value={{ showComments, showImports }}>
        <Header>
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
        </Header>
        <Content>
          <ToggleShow
            title="Jump to"
            content={
              <ul>
                <li key="setup">
                  <a href={`#setup`}>Setup</a>
                </li>
                {tests.map((test, idx) => (
                  <li key={test.name}>
                    <a href={`#${test.name}`}>
                      {idx + 1}. {test.title}
                    </a>
                  </li>
                ))}
              </ul>
            }
            closed
          />
          <Section id="setup">
            <Setup setup={setup} />
          </Section>
          {tests.map(test => (
            <Section id={test.name} key={test.name}>
              <Test test={test} />
            </Section>
          ))}
        </Content>
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

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  padding: 8px 12px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 2px 0px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  h1 {
    margin: 0;
  }
`;

const Content = styled.div`
  margin-top: 80px;
  padding: 8px 12px;
  background: #f7f7f7;
`;

// XXX: Hack for #links to jump to content under sticky header
const Section = styled.div`
  margin-top: -80px;
  padding-top: 80px;
`;
