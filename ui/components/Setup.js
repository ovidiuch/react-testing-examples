// @flow

import React, { Component } from 'react';
import { Search } from '../contexts';
import { Description } from '../styles';
import { File } from './File';
import { FuzzyHighlighter } from './FuzzyHighlighter';
import { TitleLink } from './TitleLink';

import type { TSetup } from '../types';

type Props = {
  setup: TSetup
};

export class Setup extends Component<Props> {
  render() {
    const { setup } = this.props;
    const { info: { title, description }, files: { jest, enzyme } } = setup;

    return (
      <Search.Consumer>
        {searchText => (
          <>
            <TitleLink link="setup">
              <FuzzyHighlighter searchText={searchText} targetText={title} />
            </TitleLink>
            {description.map((p, idx) => (
              <Description key={idx}>
                <FuzzyHighlighter searchText={searchText} targetText={p} />
              </Description>
            ))}
            <File name="jest.config.js" code={jest} />
            <File name="enzyme.config.js" code={enzyme} />
          </>
        )}
      </Search.Consumer>
    );
  }
}
