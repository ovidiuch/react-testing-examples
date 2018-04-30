// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Center } from '../styles';
import { FileOptions, Search } from '../contexts';

type Props = {
  toggleComments: () => mixed,
  toggleImports: () => mixed,
  changeSearch: (searchText: string) => mixed
};

// TODO: Design
export function Header({ toggleComments, toggleImports, changeSearch }: Props) {
  return (
    <Container>
      <Center>
        <div style={{ float: 'left' }}>
          <h1>React Testing Examples</h1>
          <div>
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
  handleSearchChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
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
            onChange={this.handleSearchChange}
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
    <Fragment>
      <label>
        <input type="checkbox" checked={checked} onChange={onToggle} /> {name}
      </label>
    </Fragment>
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
