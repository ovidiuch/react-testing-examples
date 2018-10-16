// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { WindowKeyListener, KEY_S, KEY_ESC } from '../shared/WindowKeyListener';

type Props = {
  searchText: string,
  onChange: (searchText: string) => mixed
};

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
          ref={node => {
            this.searchInput = node;
          }}
          type="text"
          placeholder="press 's' to search"
          value={this.props.searchText}
          onChange={this.handleChange}
        />
      </WindowKeyListener>
    );
  }
}

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 272px;
  height: 32px;
  padding: 4px 16px;
  border: 0;
  border-radius: 5px;
  background: #dde0e8;
  color: #20232a;
  line-height: 24px;
  outline: none;

  ::placeholder {
    text-align: center;
    color: rgba(32, 35, 42, 0.5);
  }
`;
