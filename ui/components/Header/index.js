// @flow

import React from 'react';
import styled from 'styled-components';
import { Center } from '../../styles';
import { TestFilterSelect } from './TestFilterSelect';
import { GithubLink } from './GithubLink';
import { SearchBox } from './SearchBox';
import { CommentsCheckbox, ImportsCheckbox } from './Checkbox';

import type { TTestFilter } from '../../types';

type Props = {
  testFilter: TTestFilter,
  setTestFilter: (testFilter: TTestFilter) => mixed,
  toggleComments: () => mixed,
  toggleImports: () => mixed,
  searchText: string,
  changeSearch: (searchText: string) => mixed
};

export function Header({
  testFilter,
  setTestFilter,
  toggleComments,
  toggleImports,
  searchText,
  changeSearch
}: Props) {
  return (
    <Container>
      <Inner>
        <Title>
          <h1>
            <a href="#top" onClick={() => changeSearch('')}>
              React Testing Examples
            </a>
          </h1>
        </Title>
        <BelowTitle>
          <TestFilterSelect testFilter={testFilter} onChange={setTestFilter} />
          <GithubLink />
        </BelowTitle>
        <Toggles>
          <CommentsCheckbox onToggle={toggleComments} />{' '}
          <ImportsCheckbox onToggle={toggleImports} />{' '}
        </Toggles>
        <SearchContainer>
          <SearchBox searchText={searchText} onChange={changeSearch} />
        </SearchContainer>
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  padding: 0 12px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 2px 0px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 1;
`;

const Inner = Center.extend`
  position: relative;
  height: 100%;
`;

const Title = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 48px;

  h1 {
    line-height: 48px;
    font-size: 28px;
    font-weight: 600;

    a {
      color: #222;
      text-decoration: none;
    }
  }
`;

const BelowTitle = styled.div`
  display: flex;
  position: absolute;
  bottom: 8px;
  left: 0;
  height: 24px;
  line-height: 24px;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 0;
`;

const Toggles = styled.div`
  display: flex;
  position: absolute;
  bottom: 8px;
  right: 0;
  height: 24px;
  line-height: 24px;
  text-align: center;
`;
