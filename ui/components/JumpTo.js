// @flow

import React, { Component } from 'react';
import { FuzzyHighlighter } from './FuzzyHighlighter';

import type { TSection } from '../types';

type Props = {
  sections: Array<TSection>,
  searchText: string,
  changeSearch: (searchText: string) => mixed
};

export class JumpTo extends Component<Props> {
  handleClearSearch = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.props.changeSearch('');
  };

  render() {
    let { sections, searchText } = this.props;

    return (
      <>
        {this.renderTitle(sections, searchText)}
        <ul>
          {sections.map(section => {
            const { name, info: { title } } =
              section.type === 'setup' ? section.setup : section.test;

            return (
              <li key={name}>
                <a href={`#${name}`}>
                  <FuzzyHighlighter
                    searchText={searchText}
                    targetText={title}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  renderTitle(sections: Array<TSection>, searchText: string) {
    if (searchText.length < 3) {
      return <p>Jump to</p>;
    }

    if (!sections.length) {
      return (
        <>
          <p>
            No results found for "{searchText}" {this.renderClearSearchBtn()}
          </p>
          <p>
            Start a{' '}
            <a
              target="_blank"
              href="https://github.com/skidding/react-testing-examples/issues/new"
            >
              conversation
            </a>{' '}
            if you have an idea for a new example.
          </p>
          <p>
            Contact{' '}
            <a target="_blank" href="https://ovidiu.ch/">
              Ovidiu
            </a>{' '}
            if you need help testing React components.
          </p>
        </>
      );
    }

    return (
      <p>
        Results for "{searchText}" {this.renderClearSearchBtn()}
      </p>
    );
  }

  renderClearSearchBtn() {
    return (
      <>
        (<a href="/" onClick={this.handleClearSearch}>
          clear search
        </a>)
      </>
    );
  }
}
