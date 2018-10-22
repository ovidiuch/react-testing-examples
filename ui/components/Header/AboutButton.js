// @flow

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import svgQuestion from '../../svg/question.svg';
import { IconButton } from './styles';

export function AboutButton() {
  return (
    <Link prefetch href="/about">
      <AboutIconLink href="/about" icon={svgQuestion}>
        <span className="icon" />
        <span className="label">About</span>
      </AboutIconLink>
    </Link>
  );
}

const AboutIconLink = styled(IconButton.withComponent('a'))`
  margin-left: 16px;
  font-weight: 400;

  @media (max-width: 399px) {
    .label {
      display: none;
    }
`;
