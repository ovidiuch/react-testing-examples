// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import svgSettings from '../../svg/settings.svg';
import svgChevronLeft from '../../svg/chevron-left.svg';
import { Center, Button } from '../shared/styles';
import { TestFilterSelect } from './TestFilterSelect';
import { GithubLink } from './GithubLink';
import { AboutButton } from './AboutButton';
import { SearchBox } from './SearchBox';
import { CommentsCheckbox, ImportsCheckbox } from './Checkbox';

import type { TTestFilter } from '../../types';

type Props = {
  testFilter: TTestFilter,
  setTestFilter: (testFilter: TTestFilter) => mixed,
  openAboutModal: () => mixed,
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
    let {
      testFilter,
      setTestFilter,
      openAboutModal,
      toggleComments,
      toggleImports,
      searchText,
      changeSearch
    } = this.props;
    let { mobileShowFilters } = this.state;

    return (
      <Container>
        <Inner>
          <Left>
            <h1>
              <a href="#top" onClick={() => changeSearch('')}>
                React Testing Examples
              </a>
            </h1>
            <div className="actions">
              <TestFilterSelect
                testFilter={testFilter}
                onChange={setTestFilter}
              />
              <GithubLink />
              <AboutButton onClick={openAboutModal} />
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

const MOBILE_BREAKPOINT = 619;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  padding: 0 12px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 2px 0px 0px rgba(32, 35, 42, 0.15);
  color: #20232a;
  overflow: hidden;
  z-index: 1;
`;

const Inner = Center.extend`
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
    line-height: 48px;
    font-size: 28px;
    font-weight: 600;
    opacity: 0.9;
    white-space: nowrap;

    a {
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

const MobileShowFilters = Button.extend`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  background-image: url(${svgSettings});
  background-size: 32px;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.9;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: ${props => (props.filtersVisible ? 'none' : 'block')};
  }
`;

const MobileHideFilters = Button.extend`
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
