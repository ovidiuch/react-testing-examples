// @flow

import React from 'react';
import styled from 'styled-components';
import svgMarkGithub from '../../svg/mark-github.svg';
import { IconButton } from './styles';

export function GithubLink() {
  return (
    <GithubIconLink
      icon={svgMarkGithub}
      target="_blank"
      href="https://github.com/skidding/react-testing-examples"
    >
      <span className="icon" />
      <span className="label">GitHub</span>
    </GithubIconLink>
  );
}

const GithubIconLink = styled(IconButton.withComponent('a'))`
  margin-left: 24px;
  font-weight: 400;

  @media (max-width: 359px) {
    .label {
      display: none;
    }
  }
`;
