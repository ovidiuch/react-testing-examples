// @flow

import React from 'react';
import styled from 'styled-components';
import svgLink from '../../svg/link.svg';
import { SectionLink } from '../shared/SectionLink';
import { H2 } from '../shared/styles';

import type { Node } from 'react';
import type { TTestKindId } from '../../types';

type Props = {
  children: Node,
  testKindId: TTestKindId,
  sectionName: string
};

export function TitleLink({ children, testKindId, sectionName }: Props) {
  return (
    <Container>
      <SectionLink testKindId={testKindId} sectionName={sectionName}>
        <a aria-hidden="true" />
      </SectionLink>
      {children}
    </Container>
  );
}

const Container = styled(H2)`
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
