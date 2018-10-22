// @flow

import React from 'react';
import styled from 'styled-components';
import svgQuestion from '../../svg/question.svg';
import { IconButton } from './styles';

type Props = {
  onClick: () => mixed
};

export function AboutButton({ onClick }: Props) {
  return (
    <AboutIconButton icon={svgQuestion} onClick={onClick}>
      <span className="icon" />
      <span className="label">About</span>
    </AboutIconButton>
  );
}

const AboutIconButton = styled(IconButton)`
  margin-left: 16px;

  @media (max-width: 399px) {
    .label {
      display: none;
    }
`;
