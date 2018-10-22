// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { shouldSearch } from '../../search';
import svgInfo from '../../svg/info.svg';
import { SectionLink } from '../shared/SectionLink';
import { FuzzyHighlighter } from '../shared/FuzzyHighlighter';
import { hasSectionChanged } from '../../shared/section';
import { CenterText, Paragraph, List, ListItem } from '../shared/styles';
import thinkin from './img/thinkin.png';
import { ToggleShow } from './ToggleShow';
import { ToggleButton } from './ToggleButton';

import type { TTestKindId, TSection } from '../../types';

type Props = {
  sections: TSection[],
  testKindId: TTestKindId,
  sectionName: ?string,
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

  componentDidUpdate(prevProps: Props) {
    if (this.state.isOpen && hasSectionChanged(this.props, prevProps)) {
      this.setState({
        isOpen: false
      });
    }
  }

  handleToggleList = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleClearSearch = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.props.changeSearch('');
  };

  render() {
    const { searchText } = this.props;
    const { isOpen } = this.state;

    if (shouldSearch(searchText)) {
      return (
        <Container>
          {this.renderSearchTitle()}
          {this.renderContent()}
        </Container>
      );
    }

    return (
      <Container>
        <ToggleShow
          header={({ show, onToggle }) => (
            <ToggleButton
              label="All examples"
              isOpen={show}
              onClick={onToggle}
            />
          )}
          content={this.renderContent()}
          show={isOpen}
          onToggle={this.handleToggleList}
        />
      </Container>
    );
  }

  renderSearchTitle() {
    const { sections, searchText } = this.props;

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

  renderContent() {
    const { sections, testKindId, sectionName, searchText } = this.props;

    if (!sections.length) {
      return (
        <>
          <ThinkinFace />
          <ContactParagraph>
            <span className="icon" />
            <span className="text">
              Contact{' '}
              <a target="_blank" href="https://ovidiu.ch/">
                Ovidiu
              </a>{' '}
              if you need help testing React components
            </span>
          </ContactParagraph>
        </>
      );
    }

    return (
      <CustomList>
        {sections.map(section => {
          const { name, readme } = section;
          const { title } = readme.meta;
          const hlText = (
            <FuzzyHighlighter searchText={searchText} targetText={title} />
          );

          return (
            <ListItem key={name}>
              {sectionName === name ? (
                <SelectedItem>{hlText}</SelectedItem>
              ) : (
                <SectionLink testKindId={testKindId} sectionName={name}>
                  <a>{hlText}</a>
                </SectionLink>
              )}
            </ListItem>
          );
        })}
      </CustomList>
    );
  }

  renderClearSearchBtn() {
    return (
      <ClearSearchBtn>
        (
        <a href="/" onClick={this.handleClearSearch}>
          clear search
        </a>
        )
      </ClearSearchBtn>
    );
  }
}

const Container = styled(CenterText)`
  margin-top: 8px;
`;

const CustomList = styled(List)`
  margin: 0;
  padding-top: 0;
  padding-left: 24px;
`;

const SelectedItem = styled.span`
  color: #888e9c;
  font-weight: 500;
`;

const SearchHeader = styled.p`
  margin: 0;
  padding: 8px 0;
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
  background: #f5f7f9 url(${thinkin}) no-repeat center center;
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
