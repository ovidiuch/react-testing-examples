// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import svgSettings from '../../svg/settings.svg';
import svgChevronLeft from '../../svg/chevron-left.svg';
import { MOBILE_BREAKPOINT, Center, Button } from '../shared/styles';
import { SectionLink } from '../shared/SectionLink';
import { TestKindSelect } from './TestKindSelect';
import { GithubLink } from './GithubLink';
import { AboutButton } from './AboutButton';
import { SearchBox } from './SearchBox';
import { CommentsCheckbox, ImportsCheckbox } from './Checkbox';

import type { TTestKindId } from '../../types';

type Props = {
  testKindId: TTestKindId,
  toggleComments: () => mixed,
  toggleImports: () => mixed,
  searchText: string,
  changeSearch: (searchText: string) => mixed
};

type State = {
  mobileShowFilters: boolean
};

export class Header extends Component<Props, State> {
  state = {
    mobileShowFilters: false
  };

  handleMobileShowFilters = () => {
    this.setState({ mobileShowFilters: true });
  };

  handleMobileHideFilters = () => {
    this.setState({ mobileShowFilters: false });
  };

  render() {
    const {
      testKindId,
      toggleComments,
      toggleImports,
      searchText,
      changeSearch
    } = this.props;
    const { mobileShowFilters } = this.state;

    return (
      <Container>
        <Inner>
          <Left>
            <h1>
              <SectionLink testKindId={testKindId}>
                <a onClick={() => changeSearch('')}>React Testing Examples</a>
              </SectionLink>
            </h1>
            <div className="actions">
              <TestKindSelect value={testKindId} />
              <GithubLink />
              <AboutButton />
            </div>
          </Left>
          <MobileShowFilters
            aria-label="Show filters"
            filtersVisible={mobileShowFilters}
            onClick={this.handleMobileShowFilters}
          />
          <MobileHideFilters
            aria-label="Hide filters"
            filtersVisible={mobileShowFilters}
            onClick={this.handleMobileHideFilters}
          >
            <span className="icon" />
          </MobileHideFilters>
          <Right mobileShowFilters={mobileShowFilters}>
            <div className="search">
              <SearchBox searchText={searchText} onChange={changeSearch} />
            </div>
            <div className="toggles">
              <CommentsCheckbox onToggle={toggleComments} />{' '}
              <ImportsCheckbox onToggle={toggleImports} />{' '}
            </div>
          </Right>
        </Inner>
      </Container>
    );
  }
}

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  min-width: 320px;
  height: 96px;
  padding: 8px 12px 4px 12px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 2px 0px 0px rgba(32, 35, 42, 0.15);
  color: #20232a;
  overflow: hidden;
  z-index: 1;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 80px;
    padding: 0 12px;
  }
`;

const Inner = styled(Center)`
  position: relative;
  height: 100%;
`;

const Left = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  h1 {
    position: absolute;
    top: 0;
    left: 0;
    color: rgb(32, 35, 42);
    line-height: 48px;
    font-size: 26px;
    font-weight: 700;
    font-style: italic;
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;
    opacity: 0.8;

    a {
      font-weight: inherit;
      color: #20232a;
      text-decoration: none;
    }
  }

  .actions {
    display: flex;
    position: absolute;
    bottom: 8px;
    left: 0;
    height: 24px;
    line-height: 24px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    h1 {
      font-size: 22px;
    }
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;

  .search {
    padding: 8px 0 0 8px;
    right: 0;
  }

  .toggles {
    display: flex;
    justify-content: center;
    height: 24px;
    padding: 0 0 8px 8px;
    line-height: 24px;
    text-align: center;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    .search {
      display: ${props => (props.mobileShowFilters ? 'block' : 'none')};
    }

    .toggles {
      display: ${props => (props.mobileShowFilters ? 'flex' : 'none')};
    }
  }
`;

const MobileShowFilters = styled(Button)`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  background-image: url(${svgSettings});
  background-size: 28px;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.9;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: ${props => (props.filtersVisible ? 'none' : 'block')};
  }
`;

const MobileHideFilters = styled(Button)`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to left,
    #fff,
    #fff 216px,
    rgba(255, 255, 255, 0.85)
  );

  .icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 56px;
    height: 80px;
    background-image: url(${svgChevronLeft});
    background-size: 32px;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.9;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: ${props => (props.filtersVisible ? 'block' : 'none')};
  }
`;
