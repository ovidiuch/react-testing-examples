// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { match } from 'fuzzaldrin-plus';
import { Center } from '../styles';
import { FileOptions, Search } from '../contexts';
import { Header } from './Header';
import { JumpTo } from './JumpTo';
import { Setup } from './Setup';
import { Test } from './Test';

import type { Node } from 'react';
import type {
  Section as TypeSection,
  Setup as TypeSetup,
  Test as TypeTest
} from '../types';

type Props = {
  setup: TypeSetup,
  tests: Array<TypeTest>
};

type State = {
  showComments: boolean,
  showImports: boolean,
  searchText: string
};

export class Page extends Component<Props, State> {
  state = {
    showComments: true,
    showImports: false,
    searchText: ''
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

  render() {
    let { setup, tests } = this.props;
    let { showComments, showImports, searchText } = this.state;

    let isSearching = searchText.length > 2;
    let showSetup = isSearching ? matchSection(setup, searchText) : true;
    let matchingTests = isSearching
      ? tests.filter(t => matchSection(t, searchText))
      : tests;

    // Convert setup & matching tests to unified list of sections
    let testSections = matchingTests.map(extractSection);
    let sections = showSetup
      ? [extractSection(setup), ...testSections]
      : testSections;

    return (
      <FileOptions.Provider value={{ showComments, showImports }}>
        <Search.Provider value={searchText}>
          <Header
            toggleComments={this.handleToggleComments}
            toggleImports={this.handleToggleImports}
            changeSearch={this.handleSearchChange}
          />
          <Content>
            <Center>
              <JumpTo sections={sections} />
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
            </Center>
          </Content>
        </Search.Provider>
      </FileOptions.Provider>
    );
  }
}

function matchSection({ title, description }: TypeSection, searchText: string) {
  let titleMatch = match(title, searchText);
  let descMatch = match(description, searchText);

  return titleMatch.length > 0 || descMatch.length > 0;
}

function extractSection({ name, title, description }): TypeSection {
  return { name, title, description };
}

type SectionProps = {
  id: string,
  children: Node
};

function Section({ id, children }: SectionProps) {
  return (
    <Fragment>
      <SectionLocation id={id} />
      {children}
    </Fragment>
  );
}

const Content = styled.div`
  margin-top: 80px;
  padding: 10px 12px 8px 12px;
`;

// XXX: Hack for #links to jump to content under sticky header
const SectionLocation = styled.div`
  position: absolute;
  margin-top: -80px;
`;
