// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { FileOptions } from '../contexts';
import { shouldSearch, matchInfo, sortSections } from '../search';
import { Header } from './Header';
import { SectionList } from './SectionList';
import { Section } from './Section';

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

export class App extends Component<Props, State> {
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

    let isSearching = shouldSearch(searchText);
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
          <SectionList
            sections={sections}
            searchText={searchText}
            changeSearch={this.handleSearchChange}
          />
          {sections.map(section => (
            <Section
              section={section}
              testFilter={testFilter}
              searchText={searchText}
            />
          ))}
        </Content>
      </FileOptions.Provider>
    );
  }
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
