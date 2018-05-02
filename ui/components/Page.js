// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { match } from 'fuzzaldrin-plus';
import { Center } from '../styles';
import { TestFilter, FileOptions, Search } from '../contexts';
import { Header } from './Header';
import { JumpTo } from './JumpTo';
import { Setup } from './Setup';
import { Test } from './Test';

import type { Node } from 'react';
import type { TTestFilter, TInfo, TSection, TSetup, TTest } from '../types';

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
    let testSections = matchingTests.map(t => extractSection(t.name, t.info));
    let sections = showSetup
      ? [extractSection(setup.name, setup.info), ...testSections]
      : testSections;

    return (
      <TestFilter.Provider value={testFilter}>
        <FileOptions.Provider value={{ showComments, showImports }}>
          <Search.Provider value={searchText}>
            <TopSpace id="top" />
            <Header
              setTestFilter={this.handleSetTestFilter}
              toggleComments={this.handleToggleComments}
              toggleImports={this.handleToggleImports}
              changeSearch={this.handleSearchChange}
            />
            <Content>
              <Center>
                <JumpTo sections={sections} />
              </Center>
              {showSetup && (
                <Section id="setup">
                  <Setup setup={setup} />
                </Section>
              )}
              {matchingTests.map(test => (
                <Section key={test.name} id={test.name}>
                  <Test test={test} />
                </Section>
              ))}
            </Content>
          </Search.Provider>
        </FileOptions.Provider>
      </TestFilter.Provider>
    );
  }
}

function matchInfo({ title, description }: TInfo, searchText: string) {
  return (
    match(title, searchText).length > 0 ||
    description.some(p => match(p, searchText).length > 0)
  );
}

function extractSection(name: string, { title, description }: TInfo): TSection {
  return { name, title, description };
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
  padding: 14px 12px 12px 12px;
  min-width: 320px;
  max-width: 1476px;
`;

// XXX: Hack for #links to jump to content under sticky header
const SectionLocation = styled.div`
  position: absolute;
  margin-top: -80px;
`;
