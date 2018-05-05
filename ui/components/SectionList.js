// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { shouldSearch } from '../search';
import { FuzzyHighlighter } from './shared/FuzzyHighlighter';
import { CenterText, Paragraph, Link } from './shared/styles';
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
          <Paragraph>
            Start a{' '}
            <Link
              target="_blank"
              href="https://github.com/skidding/react-testing-examples/issues/new"
            >
              conversation
            </Link>{' '}
            if you have an idea for a new testing example.
          </Paragraph>
          <ContactParagraph>
            Contact{' '}
            <Link target="_blank" href="https://ovidiu.ch/">
              Ovidiu
            </Link>{' '}
            if you need help testing React components.
          </ContactParagraph>
        </>
      );
    }

    return (
      <List>
        {sections.map(section => {
          const { name, info: { title } } =
            section.type === 'setup' ? section.setup : section.test;

          return (
            <ListItem key={name}>
              <Link href={`#${name}`}>
                <FuzzyHighlighter searchText={searchText} targetText={title} />
              </Link>
            </ListItem>
          );
        })}
      </List>
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
  margin: 16px auto;
`;

export const List = styled.ul`
  padding-left: 52px;
`;

export const ListItem = styled.li`
  line-height: 24px;
  margin: 4px 0;
  color: #666;
`;

const SearchHeader = styled.div`
  padding: 0 24px;
  height: 36px;
  line-height: 36px;
`;

const ClearSearchBtn = styled.span`
  opacity: 0.6;

  a {
    color: #000;
  }
`;

const ContactParagraph = Paragraph.extend`
  padding: 0 24px;
  height: 36px;
  line-height: 36px;
  background: #ddd;
  border-radius: 10px;
`;
