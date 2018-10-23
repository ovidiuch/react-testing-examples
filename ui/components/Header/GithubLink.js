// @flow

import React from 'react';
import styled from 'styled-components';
import svgMarkGithub from '../../svg/mark-github.svg';
import { IconButton } from './styles';

export function GithubLink() {
  return (
    <GitHubIconButton
      as="a"
      icon={svgMarkGithub}
      target="_blank"
      href="https://github.com/skidding/react-testing-examples"
    >
      <span className="icon" />
      <span className="label">GitHub</span>
    </GitHubIconButton>
  );
}

const GitHubIconButton = styled(IconButton)`
  margin-left: 24px;

  @media (max-width: 359px) {
    .label {
      display: none;
    }
  }
`;
