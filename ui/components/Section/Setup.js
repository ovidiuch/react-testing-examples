// @flow

import React, { Component } from 'react';
import { CenterText, Paragraph } from '../shared/styles';
import { FuzzyHighlighter } from '../shared/FuzzyHighlighter';
import { File } from '../File';
import { SectionDescription } from './styles';
import { TitleLink } from './TitleLink';

import type { TSetup } from '../../types';

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
        <CenterText>
          <TitleLink link="setup">
            <FuzzyHighlighter searchText={searchText} targetText={title} />
          </TitleLink>
          <SectionDescription>
            {description.map((p, idx) => <Paragraph key={idx}>{p}</Paragraph>)}
          </SectionDescription>
        </CenterText>
        <File name="jest.setup.js" filePath="jest.setup.js" code={jest} />
        <File name="enzyme.setup.js" filePath="enzyme.setup.js" code={enzyme} />
      </>
    );
  }
}
