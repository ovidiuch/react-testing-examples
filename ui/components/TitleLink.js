// @flow

import React from 'react';
import { Title } from '../styles';
import { SvgLink } from '../svg';

import type { Node } from 'react';

type Props = {
  link: string,
  children: Node
};

export function TitleLink({ link, children }: Props) {
  return (
    <Container>
      <a href={`#${link}`} aria-hidden="true">
        <SvgLink />
      </a>
      {children}
    </Container>
  );
}

const Container = Title.extend`
  a {
    position: absolute;
    width: 24px;
    height: 24px;
    margin-left: -32px;
    padding: 4px;
  }

  svg {
    display: block;
    width: 24px;
    height: 24px;
    visibility: hidden;
  }

  :hover svg {
    visibility: visible;
  }
`;
