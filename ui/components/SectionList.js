// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { shouldSearch } from '../search';
import svgInfo from '../svg/info.svg';
import pngThinkin from '../img/thinkin.png';
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
          <ThinkinFace />
          <ContactParagraph>
            <span className="icon" />
            <span className="text">
              Contact{' '}
              <Link target="_blank" href="https://ovidiu.ch/">
                Ovidiu
              </Link>{' '}
              if you need help testing React components
            </span>
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

const Container = styled(CenterText)`
  margin-top: 16px;
`;

const CustomList = styled(List)`
  margin: 0;
  padding-top: 8px;
  padding-left: 24px;
`;

const CustomListItem = styled(ListItem)`
  color: #888e9c;
`;

const SearchHeader = styled.p`
  margin: 0;
  padding: 6px 24px;
  line-height: 24px;
`;

const ClearSearchBtn = styled.span`
  opacity: 0.7;

  a {
    color: #20232a;
    white-space: nowrap;

    :hover {
      text-decoration: none;
    }
  }
`;

const ThinkinFace = styled.div`
  margin: 32px auto;
  width: 140px;
  height: 140px;
  background: #f5f7f9 url(${pngThinkin}) no-repeat center center;
  background-size: 140px 140px;
  background-blend-mode: luminosity;
  opacity: 0;
  filter: blur(16px);
  animation: fadeIn 1s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      filter: blur(16px);
    }
    to {
      opacity: 1;
      filter: blur(0);
    }
  }
`;

const ContactParagraph = styled(Paragraph)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 24px 0;

  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 4px;
    background: url(${svgInfo});
    background-size: 20px;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.5;
    flex-shrink: 0;
  }

  .text {
    color: rgba(32, 35, 42, 0.7);
  }
`;
