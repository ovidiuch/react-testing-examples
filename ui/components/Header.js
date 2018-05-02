// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Center } from '../styles';
import { FileOptions } from '../contexts';

import type { Node } from 'react';
import type { TTestFilter } from '../types';

type Props = {
  testFilter: TTestFilter,
  setTestFilter: (testFilter: TTestFilter) => mixed,
  toggleComments: () => mixed,
  toggleImports: () => mixed,
  searchText: string,
  changeSearch: (searchText: string) => mixed
};

// TODO: Design
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
      <Center>
        <TopRow>
          <Left>
            <h1>
              <a href="#top" onClick={() => changeSearch('')}>
                React Testing Examples
              </a>
            </h1>
          </Left>
          <Right>
            <SearchBox searchText={searchText} onChange={changeSearch} />
          </Right>
        </TopRow>
        <BottomRow>
          <Left style={{ marginTop: 2 }}>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=twbs&repo=bootstrap&type=star&count=true"
              frameBorder="0"
              scrolling="0"
              width="160px"
              height="20px"
            />
          </Left>
          <Right>
            <CommentsCheckbox onToggle={toggleComments} />{' '}
            <ImportsCheckbox onToggle={toggleImports} />{' '}
            <TestFilterSelect
              testFilter={testFilter}
              onChange={setTestFilter}
            />
          </Right>
        </BottomRow>
      </Center>
    </Container>
  );
}

type TestFilterSelectProps = {
  testFilter: TTestFilter,
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
      <select value={this.props.testFilter} onChange={this.handleChange}>
        <option value="enzyme">Plain Enzyme</option>
        <option value="cosmos">Enzyme & Cosmos</option>
      </select>
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

type SearchBoxProps = {
  searchText: string,
  onChange: (searchText: string) => mixed
};

const KEY_S = 83;
const KEY_ESC = 27;

class SearchBox extends Component<SearchBoxProps> {
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
        <SearchInput
          innerRef={node => {
            this.searchInput = node;
          }}
          type="text"
          placeholder="Press 's' key to search"
          value={this.props.searchText}
          onChange={this.handleChange}
        />
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
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 2px 0px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 1;

  h1 {
    margin: 0;
  }
`;

const TopRow = styled.div`
  overflow: hidden;
  height: 48px;
  padding: 0 12px;

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

const BottomRow = styled.div`
  overflow: hidden;
  height: 24px;
  line-height: 24px;
  padding: 0 12px;
`;

const Left = styled.div`
  float: left;
`;

const Right = styled.div`
  float: right;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 200px;
  height: 32px;
  margin-top: 8px;
  padding: 0 12px;
  border: 0;
  border-radius: 5px;
  background: #e1e1e1;
  line-height: 32px;
  outline: none;
`;
