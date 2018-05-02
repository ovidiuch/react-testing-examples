// @flow

import React, { Component } from 'react';
import { Description, Paragraph } from '../styles';
import { File } from './File';
import { FuzzyHighlighter } from './FuzzyHighlighter';
import { TitleLink } from './TitleLink';

import type { TSetup } from '../types';

type Props = {
  setup: TSetup,
  searchText: string
};

export class Setup extends Component<Props> {
  render() {
    const { setup, searchText } = this.props;
    const { info: { title, description }, files: { jest, enzyme } } = setup;

    return (
      <>
        <TitleLink link="setup">
          <FuzzyHighlighter searchText={searchText} targetText={title} />
        </TitleLink>
        <Description>
          {description.map((p, idx) => <Paragraph key={idx}>{p}</Paragraph>)}
        </Description>
        <File name="jest.setup.js" code={jest} />
        <File name="enzyme.setup.js" code={enzyme} />
      </>
    );
  }
}
