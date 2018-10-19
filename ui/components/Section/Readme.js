// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Paragraph, Link, Blockquote, InlineCode } from '../shared/styles';
import { FuzzyHighlighter } from '../shared/FuzzyHighlighter';
import { TitleLink } from './TitleLink';

import type { TReadme } from '../../types';

type Props = {
  name: string,
  readme: TReadme,
  searchText: string
};

export class Readme extends Component<Props> {
  render() {
    const { name, readme, searchText } = this.props;

    return (
      <Container>
        <readme.component
          components={{
            h2: ({ children }) => (
              <TitleLink link={name}>
                <FuzzyHighlighter
                  searchText={searchText}
                  targetText={children}
                />
              </TitleLink>
            ),
            p: Paragraph,
            blockquote: Blockquote,
            inlineCode: InlineCode,
            a: props => <Link target="_blank" {...props} />
          }}
        />
      </Container>
    );
  }
}

export const Container = styled.div`
  margin-bottom: 24px;
`;
