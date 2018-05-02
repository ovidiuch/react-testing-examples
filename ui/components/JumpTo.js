// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { CenterText, Paragraph, List, ListItem, Link } from '../styles';
import { FuzzyHighlighter } from './FuzzyHighlighter';

import type { TSection } from '../types';

type Props = {
  sections: Array<TSection>,
  searchText: string,
  changeSearch: (searchText: string) => mixed
};

export class JumpTo extends Component<Props> {
  handleClearSearch = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.props.changeSearch('');
  };

  render() {
    let { sections, searchText } = this.props;

    return (
      <CenterText>
        {this.renderTitle(sections, searchText)}
        <List>
          {sections.map(section => {
            const { name, info: { title } } =
              section.type === 'setup' ? section.setup : section.test;

            return (
              <ListItem key={name}>
                <Link href={`#${name}`}>
                  <FuzzyHighlighter
                    searchText={searchText}
                    targetText={title}
                  />
                </Link>
              </ListItem>
            );
          })}
        </List>
      </CenterText>
    );
  }

  renderTitle(sections: Array<TSection>, searchText: string) {
    if (searchText.length < 3) {
      return <Title>Jump to</Title>;
    }

    if (!sections.length) {
      return (
        <>
          <Title>
            No results found for "{searchText}" {this.renderClearSearchBtn()}
          </Title>
          <Paragraph>
            Start a{' '}
            <Link
              target="_blank"
              href="https://github.com/skidding/react-testing-examples/issues/new"
            >
              conversation
            </Link>{' '}
            if you have an idea for a new example.
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
      <Title>
        Results for "{searchText}" {this.renderClearSearchBtn()}
      </Title>
    );
  }

  renderClearSearchBtn() {
    return (
      <>
        (<a href="/" onClick={this.handleClearSearch}>
          clear search
        </a>)
      </>
    );
  }
}

const Title = Paragraph.extend`
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
