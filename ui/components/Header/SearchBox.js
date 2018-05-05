// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { WindowKeyListener } from './WindowKeyListener';

type Props = {
  searchText: string,
  onChange: (searchText: string) => mixed
};

const KEY_S = 83;
const KEY_ESC = 27;

export class SearchBox extends Component<Props> {
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

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 200px;
  height: 32px;
  padding: 4px 16px;
  border: 0;
  border-radius: 5px;
  background: #dde0e8;
  color: #20232a;
  line-height: 24px;
  outline: none;

  ::-webkit-input-placeholder {
    color: rgb(32, 35, 42, 0.5);
  }
`;
