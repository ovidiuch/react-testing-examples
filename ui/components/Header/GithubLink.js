// @flow

import React from 'react';
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
      <span className="label">Open Source</span>
    </GithubIconLink>
  );
}

const GithubIconLink = IconButton.withComponent('a').extend`
  margin-left: 12px;
`;
