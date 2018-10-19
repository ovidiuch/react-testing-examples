// @flow
/* eslint-env browser */

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

import type { TTestKindId, TTestKinds } from '../types';

const DEFAULT_TEST_KIND_ID = 'jest-enzyme';

type Props = {
  gitRef: string,
  testKinds: TTestKinds,
  showAbout: boolean
};

type State = {
  selTestKindId: TTestKindId,
  showComments: boolean,
  showImports: boolean,
  searchText: string
};

export class App extends Component<Props, State> {
  static defaultProps = {
    showAbout: false
  };

  state = {
    selTestKindId: DEFAULT_TEST_KIND_ID,
    showAboutModal: false,
    showComments: true,
    showImports: false,
    searchText: ''
  };

  handleSetSelTestKindId = (selTestKindId: TTestKindId) => {
    this.setState({ selTestKindId });
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
      window.scrollTo(0, 0);
    }

    setBodyScroll(showAbout);
  }

  render() {
    const { gitRef, testKinds, showAbout } = this.props;
    const { selTestKindId, showComments, showImports, searchText } = this.state;
    const testKind = testKinds[selTestKindId];

    const { setup, tests } = testKind;
    const isSearching = shouldSearch(searchText);
    const showSetup = isSearching
      ? matchReadmeText(setup.readme.meta, searchText)
      : true;
    const matchingTests = isSearching
      ? tests.filter(t => matchReadmeText(t.readme.meta, searchText))
      : tests;

    // Tests are ordererd based on a match score when searching. But we want
    // the setup to always be first regardless of the test score.
    let sections = showSetup ? [setup, ...matchingTests] : matchingTests;

    if (isSearching) {
      sections = sortSections(sections, searchText);
    }

    return (
      <GitRef.Provider value={gitRef}>
        <FileOptions.Provider value={{ showComments, showImports }}>
          <Content>
            <TopSpace id="top" />
            <Header
              selTestKindId={selTestKindId}
              setSelTestKindId={this.handleSetSelTestKindId}
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
                  key={section.name}
                  testKindId={selTestKindId}
                  section={section}
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

function setBodyScroll(hasModal: boolean) {
  // Prevent double scroll when modal is open
  if (document.body) {
    document.body.className = hasModal ? 'with-modal' : '';
  }
}

const TopSpace = styled.div`
  height: 96px;
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
