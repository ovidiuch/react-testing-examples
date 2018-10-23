// @flow

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import svgQuestion from '../../svg/question.svg';
import { IconButton } from './styles';

export function AboutButton() {
  return (
    <Link prefetch href="/about">
      <AboutIconButton as="a" href="/about" icon={svgQuestion}>
        <span className="icon" />
        <span className="label">About</span>
      </AboutIconButton>
    </Link>
  );
}

const AboutIconButton = styled(IconButton)`
  margin-left: 16px;

  @media (max-width: 399px) {
    .label {
      display: none;
    }
`;
