// @flow

import React, { Component, Fragment } from 'react';
import { Search } from '../contexts';
import { Title } from '../styles';
import { File } from './File';
import { LeftRight } from './LeftRight';
import { FuzzyHighlighter } from './FuzzyHighlighter';

import type { Setup as SetupTest } from '../types';

type Props = {
  setup: SetupTest
};

export class Setup extends Component<Props> {
  render() {
    const { title, files } = this.props.setup;
    const { jest, enzyme } = files;

    return (
      <Search.Consumer>
        {searchText => (
          <Fragment>
            <Title>
              <FuzzyHighlighter searchText={searchText} targetText={title} />
            </Title>
            <LeftRight
              left={<File name="jest.config.js" code={jest} closed />}
              right={<File name="enzyme.config.js" code={enzyme} closed />}
            />
          </Fragment>
        )}
      </Search.Consumer>
    );
  }
}
