// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { FileOptions } from '../contexts';
import { matchInfo, sortSections } from '../search';
import { Header } from './Header';
import { JumpTo } from './JumpTo';
import { Setup } from './Setup';
import { Test } from './Test';

import type { Node } from 'react';
import type { TTestFilter, TSetup, TTest } from '../types';

type Props = {
  setup: TSetup,
  tests: Array<TTest>
};

type State = {
  testFilter: TTestFilter,
  showComments: boolean,
  showImports: boolean,
  searchText: string
};

export class Page extends Component<Props, State> {
  state = {
    testFilter: 'cosmos',
    showComments: true,
    showImports: false,
    searchText: ''
  };

  handleSetTestFilter = (testFilter: TTestFilter) => {
    this.setState({ testFilter });
  };

  handleToggleComments = () => {
    this.setState({ showComments: !this.state.showComments });
  };

  handleToggleImports = () => {
    this.setState({ showImports: !this.state.showImports });
  };

  handleSearchChange = (searchText: string) => {
    this.setState({ searchText });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { searchText } = this.state;
    if (searchText && searchText !== prevState.searchText) {
      global.window.scrollTo(0, 0);
    }
  }

  render() {
    let { setup, tests } = this.props;
    let { testFilter, showComments, showImports, searchText } = this.state;

    let isSearching = searchText.length > 2;
    let showSetup = isSearching ? matchInfo(setup.info, searchText) : true;
    let matchingTests = isSearching
      ? tests.filter(t => matchInfo(t.info, searchText))
      : tests;

    // Convert setup & matching tests to unified list of sections
    let testSections = matchingTests.map(test => ({ type: 'test', test }));
    let sections = showSetup
      ? [{ type: 'setup', setup }, ...testSections]
      : testSections;

    if (isSearching) {
      sections = sortSections(sections, searchText);
    }

    return (
      <FileOptions.Provider value={{ showComments, showImports }}>
        <TopSpace id="top" />
        <Header
          testFilter={testFilter}
          setTestFilter={this.handleSetTestFilter}
          toggleComments={this.handleToggleComments}
          toggleImports={this.handleToggleImports}
          searchText={searchText}
          changeSearch={this.handleSearchChange}
        />
        <Content>
          <JumpTo
            sections={sections}
            searchText={searchText}
            changeSearch={this.handleSearchChange}
          />
          {sections.map(
            section =>
              section.type === 'setup'
                ? this.renderSetup(section.setup, testFilter, searchText)
                : this.renderTest(section.test, testFilter, searchText)
          )}
        </Content>
      </FileOptions.Provider>
    );
  }

  renderSetup(setup: TSetup, testFilter: TTestFilter, searchText: string) {
    const { name } = setup;

    return (
      <Section key={name} id={name}>
        <Setup setup={setup} testFilter={testFilter} searchText={searchText} />
      </Section>
    );
  }

  renderTest(test: TTest, testFilter: TTestFilter, searchText: string) {
    const { name } = test;

    return (
      <Section key={name} id={name}>
        <Test test={test} testFilter={testFilter} searchText={searchText} />
      </Section>
    );
  }
}

type SectionProps = {
  id: string,
  children: Node
};

function Section({ id, children }: SectionProps) {
  return (
    <>
      <SectionLocation id={id} />
      {children}
    </>
  );
}

const TopSpace = styled.div`
  height: 80px;
`;

const Content = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  padding: 2px 12px 0 12px;
  min-width: 320px;
  max-width: 1476px;
`;

// XXX: Hack for #links to jump to content under sticky header
const SectionLocation = styled.div`
  position: absolute;
  margin-top: -80px;
`;
