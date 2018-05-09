// @flow

import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { FileOptions, GitRef } from '../contexts';
import { shouldSearch, matchReadmeText, sortSections } from '../search';
import { Header } from './Header';
import { AboutModal } from './AboutModal';
import { SectionList } from './SectionList';
import { Section } from './Section';
import { Footer } from './Footer';

import type { TTestFilter, TSetup, TTest, TSection } from '../types';

type Props = {
  gitRef: string,
  setup: TSetup,
  tests: Array<TTest>,
  showAbout: boolean
};

type State = {
  testFilter: TTestFilter,
  showComments: boolean,
  showImports: boolean,
  searchText: string
};

export class App extends Component<Props, State> {
  static defaultProps = {
    showAbout: false
  };

  state = {
    testFilter: 'enzyme',
    showAboutModal: false,
    showComments: true,
    showImports: false,
    searchText: ''
  };

  handleSetTestFilter = (testFilter: TTestFilter) => {
    this.setState({ testFilter });
  };

  handleOpenAboutModal = () => {
    Router.push('/about');
  };

  handleCloseAboutModal = () => {
    Router.push('/');
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

  componentDidMount() {
    setBodyScroll(this.props.showAbout);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { showAbout } = this.props;
    const { searchText } = this.state;

    // Jump to top when changing search query, because results will change
    // anyway so previous scroll position will be irrelevant
    if (searchText && searchText !== prevState.searchText) {
      global.window.scrollTo(0, 0);
    }

    setBodyScroll(showAbout);
  }

  render() {
    let { gitRef, setup, tests, showAbout } = this.props;
    let { testFilter, showComments, showImports, searchText } = this.state;

    let isSearching = shouldSearch(searchText);
    let showSetup = isSearching
      ? matchReadmeText(setup.readme.text, searchText)
      : true;
    let matchingTests = isSearching
      ? tests.filter(t => matchReadmeText(t.readme.text, searchText))
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
      <GitRef.Provider value={gitRef}>
        <FileOptions.Provider value={{ showComments, showImports }}>
          <Content>
            <TopSpace id="top" />
            <Header
              testFilter={testFilter}
              setTestFilter={this.handleSetTestFilter}
              openAboutModal={this.handleOpenAboutModal}
              toggleComments={this.handleToggleComments}
              toggleImports={this.handleToggleImports}
              searchText={searchText}
              changeSearch={this.handleSearchChange}
            />
            <ContentCenter>
              <SectionList
                sections={sections}
                searchText={searchText}
                changeSearch={this.handleSearchChange}
              />
              {sections.map(section => (
                <Section
                  key={getSectionKey(section)}
                  section={section}
                  testFilter={testFilter}
                  searchText={searchText}
                />
              ))}
            </ContentCenter>
            <Footer />
            {showAbout && <AboutModal onClose={this.handleCloseAboutModal} />}
          </Content>
        </FileOptions.Provider>
      </GitRef.Provider>
    );
  }
}

function getSectionKey(section: TSection): string {
  return section.type === 'setup' ? section.setup.name : section.test.name;
}

function setBodyScroll(hasModal: boolean) {
  // Prevent double scroll when modal is open
  global.document.body.className = hasModal ? 'with-modal' : '';
}

const TopSpace = styled.div`
  height: 80px;
`;

const Content = styled.div`
  background: #f5f7f9;
  color: #20232a;
`;

const ContentCenter = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  padding: 2px 12px 0 12px;
  min-width: 320px;
  max-width: 1476px;
  overflow: hidden;
`;
