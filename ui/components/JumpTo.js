// @flow

import React, { Component } from 'react';
import { Search } from '../contexts';
import { FuzzyHighlighter } from './FuzzyHighlighter';

import type { Section as TypeSection } from '../types';

type Props = {
  sections: Array<TypeSection>
};

export class JumpTo extends Component<Props> {
  render() {
    let { sections } = this.props;

    // TODO: Found {results.length} matches for "{searchText}"
    // TODO: No matches found for "{searchText}". [Clear search] or contact Ovidiu if you have trouble testing a React component.
    return (
      <Search.Consumer>
        {searchText => (
          <>
            <p>Jump to</p>
            <ul>
              {sections.map(({ name, title }) => (
                <li key={name}>
                  <a href={`#${name}`}>
                    <FuzzyHighlighter
                      searchText={searchText}
                      targetText={title}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </Search.Consumer>
    );
  }
}
