// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Center } from '../styles';
import { TestFilter, FileOptions, Search } from '../contexts';

import type { Node } from 'react';
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
        <Clear>
          <Left>
            <h1>React Testing Examples</h1>
          </Left>
          <Right>
            <SearchInput onChange={changeSearch} />
          </Right>
        </Clear>
        <Clear>
          <Left>
            <img
              src="https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg?style=square"
              alt="CircleCI"
            />{' '}
            <iframe
              src="https://ghbtns.com/github-btn.html?user=twbs&repo=bootstrap&type=star&count=true"
              frameBorder="0"
              scrolling="0"
              width="170px"
              height="20px"
            />
          </Left>
          <Right>
            <CommentsCheckbox onToggle={toggleComments} />{' '}
            <ImportsCheckbox onToggle={toggleImports} />{' '}
            <TestFilterSelect onChange={setTestFilter} />
          </Right>
        </Clear>
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

const KEY_S = 83;
const KEY_ESC = 27;

class SearchInput extends Component<SearchInputProps> {
  searchInput: ?HTMLInputElement;

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onChange(e.currentTarget.value);
  };

  handleKeyDown = (e: SyntheticKeyboardEvent<HTMLElement>) => {
    let { searchInput } = this;
    if (!searchInput) {
      return;
    }

    const isFocused = searchInput === global.document.activeElement;
    if (e.keyCode === KEY_S && !isFocused) {
      // Prevent entering `s` in the search field along with focusing
      e.preventDefault();
      searchInput.focus();
    } else if (e.keyCode === KEY_ESC && isFocused) {
      this.props.onChange('');
      searchInput.blur();
    }
  };

  render() {
    return (
      <WindowKeyListener onKeyDown={this.handleKeyDown}>
        <Search.Consumer>
          {searchText => (
            <input
              ref={node => {
                this.searchInput = node;
              }}
              type="text"
              placeholder="Press 's' key to search"
              value={searchText}
              onChange={this.handleChange}
            />
          )}
        </Search.Consumer>
      </WindowKeyListener>
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
      <input type="checkbox" checked={checked} onChange={onToggle} />
      {name}
    </label>
  );
}

type WindowKeyListenerProps = {
  children: Node,
  onKeyDown: (e: SyntheticKeyboardEvent<HTMLElement>) => mixed
};

class WindowKeyListener extends Component<WindowKeyListenerProps> {
  componentDidMount() {
    global.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    global.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: SyntheticKeyboardEvent<HTMLElement>) => {
    this.props.onKeyDown(e);
  };

  render() {
    return this.props.children;
  }
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

const Left = styled.div`
  float: left;
`;

const Right = styled.div`
  float: right;
`;

const Clear = styled.div`
  overflow: hidden;
`;
