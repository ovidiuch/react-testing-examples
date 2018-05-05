// @flow

import React from 'react';
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

const AboutIconButton = IconButton.extend`
  margin-left: 12px;
`;
