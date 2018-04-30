// @flow

import React, { Component } from 'react';
import { Search } from '../contexts';
import { Title, Description } from '../styles';
import { File } from './File';
import { FuzzyHighlighter } from './FuzzyHighlighter';

import type { TSetup } from '../types';

type Props = {
  setup: TSetup
};

export class Setup extends Component<Props> {
  render() {
    const { title, files } = this.props.setup;
    const { jest, enzyme } = files;

    return (
      <Search.Consumer>
        {searchText => (
          <>
            <Title>
              <FuzzyHighlighter searchText={searchText} targetText={title} />
            </Title>
            <Description>
              A fixture is a JS object used to mock component input and external
              dependencies. The input can be props, children, state and context.
              With the help of proxies, fixtures can mock anything else a
              component depends on, from API responses to localStorage.
            </Description>
            <File name="jest.config.js" code={jest} />
            <File name="enzyme.config.js" code={enzyme} />
          </>
        )}
      </Search.Consumer>
    );
  }
}
