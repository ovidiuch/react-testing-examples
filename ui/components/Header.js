// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Center } from '../styles';
import { TestFilter, FileOptions, Search } from '../contexts';

import type { TTestFilter } from '../types';

type Props = {
  setTestFilter: (testFilter: TTestFilter) => mixed,
  toggleComments: () => mixed,
  toggleImports: () => mixed,
  changeSearch: (searchText: string) => mixed
};

// TODO: Design
export function Header({
  setTestFilter,
  toggleComments,
  toggleImports,
  changeSearch
}: Props) {
  return (
    <Container>
      <Center>
        <div style={{ float: 'left' }}>
          <h1>React Testing Examples</h1>
          <div>
            <TestFilterSelect onChange={setTestFilter} />
            <CommentsCheckbox onToggle={toggleComments} />
            <ImportsCheckbox onToggle={toggleImports} />
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <SearchInput onChange={changeSearch} />
        </div>
      </Center>
    </Container>
  );
}

type TestFilterSelectProps = {
  onChange: (testFilter: TTestFilter) => mixed
};

class TestFilterSelect extends Component<TestFilterSelectProps> {
  handleChange = (e: SyntheticInputEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;

    if (value === 'enzyme' || value === 'cosmos') {
      this.props.onChange(value);
    }
  };

  render() {
    return (
      <TestFilter.Consumer>
        {testFilter => (
          <select value={testFilter} onChange={this.handleChange}>
            <option value="enzyme">Plain Enzyme</option>
            <option value="cosmos">Enzyme & Cosmos</option>
          </select>
        )}
      </TestFilter.Consumer>
    );
  }
}

function CommentsCheckbox({ onToggle }) {
  return (
    <FileOptions.Consumer>
      {({ showComments }) => (
        <Checkbox name="comments" checked={showComments} onToggle={onToggle} />
      )}
    </FileOptions.Consumer>
  );
}

function ImportsCheckbox({ onToggle }) {
  return (
    <FileOptions.Consumer>
      {({ showImports }) => (
        <Checkbox name="imports" checked={showImports} onToggle={onToggle} />
      )}
    </FileOptions.Consumer>
  );
}

type SearchInputProps = {
  onChange: (searchText: string) => mixed
};

// TODO: Focus on `s` key
// TODO: Clear on `ESC` key (while focused)
class SearchInput extends Component<SearchInputProps> {
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onChange(e.currentTarget.value);
  };

  render() {
    return (
      <Search.Consumer>
        {searchText => (
          <input
            type="text"
            placeholder="Press 's' key to search"
            value={searchText}
            onChange={this.handleChange}
          />
        )}
      </Search.Consumer>
    );
  }
}

type CheckboxProps = {
  name: string,
  checked: boolean,
  onToggle: () => mixed
};

function Checkbox({ name, checked, onToggle }: CheckboxProps) {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onToggle} /> {name}
    </label>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  padding: 8px 12px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 2px 0px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 1;

  h1 {
    margin: 0;
  }
`;
