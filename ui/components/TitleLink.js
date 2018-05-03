// @flow

import React from 'react';
import { SectionTitle } from '../styles';
import svgLink from '../svg/link.svg';

import type { Node } from 'react';

type Props = {
  link: string,
  children: Node
};

export function TitleLink({ link, children }: Props) {
  return (
    <Container>
      <a href={`#${link}`} aria-hidden="true" />
      {children}
    </Container>
  );
}

const Container = SectionTitle.extend`
  a {
    position: absolute;
    width: 24px;
    height: 24px;
    padding: 4px;
    margin-left: -32px;

    :focus {
      outline: none;
    }
  }

  :hover a {
    background: url(${svgLink});
    background-size: 24px;
    background-position: calc(100% - 4px) 4px;
    background-repeat: no-repeat;
  }
`;
