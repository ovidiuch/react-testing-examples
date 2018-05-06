// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { shouldSearch } from '../search';
import { FuzzyHighlighter } from './shared/FuzzyHighlighter';
import { CenterText, Paragraph, Link, List, ListItem } from './shared/styles';
import { ToggleShow } from './shared/ToggleShow';
import { ToggleButton } from './shared/ToggleButton';

import type { TSection } from '../types';

type Props = {
  sections: Array<TSection>,
  searchText: string,
  changeSearch: (searchText: string) => mixed
};

type State = {
  isOpen: boolean
};

export class SectionList extends Component<Props, State> {
  state = {
    isOpen: false
  };

  handleToggleList = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleClearSearch = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.props.changeSearch('');
  };

  render() {
    let { sections, searchText } = this.props;
    let { isOpen } = this.state;

    if (shouldSearch(searchText)) {
      return (
        <Container>
          {this.renderSearchTitle(sections, searchText)}
          {this.renderContent(sections, searchText)}
        </Container>
      );
    }

    return (
      <Container>
        <ToggleShow
          header={({ show, onToggle }) => (
            <ToggleButton label="Jump to" isOpen={show} onClick={onToggle} />
          )}
          content={this.renderContent(sections, searchText)}
          show={isOpen}
          onToggle={this.handleToggleList}
        />
      </Container>
    );
  }

  renderSearchTitle(sections: Array<TSection>, searchText: string) {
    if (!sections.length) {
      return (
        <SearchHeader>
          No results found for "{searchText}" {this.renderClearSearchBtn()}
        </SearchHeader>
      );
    }

    return (
      <SearchHeader>
        Results for "{searchText}" {this.renderClearSearchBtn()}
      </SearchHeader>
    );
  }

  renderContent(sections: Array<TSection>, searchText: string) {
    if (!sections.length) {
      return (
        <>
          <ContactParagraph>
            WIP Contact{' '}
            <Link target="_blank" href="https://ovidiu.ch/">
              Ovidiu
            </Link>{' '}
            if you need help testing React components.
          </ContactParagraph>
        </>
      );
    }

    return (
      <CustomList>
        {sections.map(section => {
          let { name, readme } =
            section.type === 'setup' ? section.setup : section.test;
          let { title } = readme.text;

          return (
            <CustomListItem key={name}>
              <Link href={`#${name}`}>
                <FuzzyHighlighter searchText={searchText} targetText={title} />
              </Link>
            </CustomListItem>
          );
        })}
      </CustomList>
    );
  }

  renderClearSearchBtn() {
    return (
      <ClearSearchBtn>
        (<a href="/" onClick={this.handleClearSearch}>
          clear search
        </a>)
      </ClearSearchBtn>
    );
  }
}

const Container = CenterText.extend`
  margin-top: 16px;
`;

const CustomList = List.extend`
  margin: 0;
  padding-top: 8px;
`;

const CustomListItem = ListItem.extend`
  color: #888e9c;
`;

const SearchHeader = styled.p`
  margin: 0;
  padding: 0 24px;
  line-height: 36px;
  white-space: nowrap;
`;

const ClearSearchBtn = styled.span`
  opacity: 0.7;

  a {
    color: #20232a;
  }
`;

const ContactParagraph = Paragraph.extend`
  color: #888e9c;
`;
