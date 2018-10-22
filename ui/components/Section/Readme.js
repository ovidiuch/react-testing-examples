// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Paragraph, Blockquote, InlineCode } from '../shared/styles';
import { FuzzyHighlighter } from '../shared/FuzzyHighlighter';
import { TitleLink } from './TitleLink';

import type { TTestKindId, TReadme } from '../../types';

type Props = {
  testKindId: TTestKindId,
  sectionName: string,
  readme: TReadme,
  searchText: string
};

export class Readme extends Component<Props> {
  render() {
    const { testKindId, sectionName, readme, searchText } = this.props;

    return (
      <Container>
        <readme.component
          components={{
            h2: ({ children }) => (
              <TitleLink testKindId={testKindId} sectionName={sectionName}>
                <FuzzyHighlighter
                  searchText={searchText}
                  targetText={children}
                />
              </TitleLink>
            ),
            p: Paragraph,
            blockquote: Blockquote,
            inlineCode: InlineCode,
            a: props => <a target="_blank" {...props} />
          }}
        />
      </Container>
    );
  }
}

export const Container = styled.div`
  margin-bottom: 24px;
`;
