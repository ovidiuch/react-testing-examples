// @flow
/* eslint-env browser */

import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { FileOptions, GitRef } from '../contexts';
import { shouldSearch, matchReadmeText, sortSections } from '../search';
import { hasSectionChanged, getSectionByName } from '../shared/section';
import { Header } from './Header';
import { AboutModal } from './AboutModal';
import { SectionList } from './SectionList';
import { Section } from './Section';
import { Footer } from './Footer';

import type { TTestKind, TSection } from '../types';

type Props = {
  gitRef: string,
  testKind: TTestKind,
  sectionName?: string,
  showAbout: boolean
};

type State = {
  showComments: boolean,
  showImports: boolean,
  searchText: string
};

export class App extends Component<Props, State> {
  static defaultProps = {
    showAbout: false
  };

  state = {
    showAboutModal: false,
    showComments: true,
    showImports: false,
    searchText: ''
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

    if (
      searchText &&
      hasSectionChanged(getSectionProps(this.props), getSectionProps(prevProps))
    ) {
      this.setState({
        searchText: ''
      });
    }
    // Jump to top when changing search query, because results will change
    // anyway so previous scroll position will be irrelevant
    else if (searchText && searchText !== prevState.searchText) {
      window.scrollTo(0, 0);
    }

    if (showAbout !== prevProps.showAbout) {
      setBodyScroll(showAbout);
    }
  }

  render() {
    const { gitRef, testKind, sectionName, showAbout } = this.props;
    const { showComments, showImports, searchText } = this.state;

    const { setup, tests } = testKind;
    const isSearching = shouldSearch(searchText);
    const sections = [setup, ...tests];

    return (
      <GitRef.Provider value={gitRef}>
        <FileOptions.Provider value={{ showComments, showImports }}>
          <Content>
            <TopSpace id="top" />
            <Header
              testKindId={testKind.id}
              toggleComments={this.handleToggleComments}
              toggleImports={this.handleToggleImports}
              searchText={searchText}
              changeSearch={this.handleSearchChange}
            />
            <ContentCenter>
              {isSearching ? (
                this.renderSearchContent(sections)
              ) : (
                <>
                  <SectionList
                    sections={sections}
                    testKindId={testKind.id}
                    sectionName={sectionName}
                    searchText={searchText}
                    changeSearch={this.handleSearchChange}
                  />
                  {sectionName
                    ? getSectionEl({
                        section: getSectionByName(sections, sectionName),
                        testKind,
                        searchText
                      })
                    : sections.map(section =>
                        getSectionEl({ section, testKind, searchText })
                      )}
                </>
              )}
            </ContentCenter>
            <Footer />
            {showAbout && <AboutModal onClose={this.handleCloseAboutModal} />}
          </Content>
        </FileOptions.Provider>
      </GitRef.Provider>
    );
  }

  renderSearchContent(sections: TSection[]) {
    const { testKind, sectionName } = this.props;
    const { searchText } = this.state;

    const matchingSections = sortSections(
      sections.filter(
        s => matchReadmeText(s.readme.meta, searchText),
        searchText
      ),
      searchText
    );

    return (
      <>
        <SectionList
          sections={matchingSections}
          testKindId={testKind.id}
          sectionName={sectionName}
          searchText={searchText}
          changeSearch={this.handleSearchChange}
        />
        {matchingSections.map(section =>
          getSectionEl({ section, testKind, searchText })
        )}
      </>
    );
  }
}

function getSectionEl({ section, testKind, searchText }) {
  return (
    <Section
      key={section.name}
      testKindId={testKind.id}
      section={section}
      searchText={searchText}
    />
  );
}

function getSectionProps({ testKind, sectionName }) {
  return {
    testKindId: testKind.id,
    sectionName
  };
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
  padding: 2px 12px 32px 12px;
  min-width: 320px;
  max-width: 1476px;
  overflow: hidden;
`;
